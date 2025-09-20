package bag.service.verification;

import bag.modal.entity.Account;
import bag.repository.AccountRepository;
import bag.service.mail.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Map;
import java.util.Random;

import static bag.support.method.Support.buildKey;

@Service
@RequiredArgsConstructor
public class VerificationService {
    private final RedisTemplate<String, String> redisTemplate;
    private final EmailService emailService;
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    private String generateOtp(){
        return String.valueOf(new Random().nextInt(90000)+10000);
    }

    public void createAndSendVerificationEmail(String email, String action){
        String code = generateOtp();
        String key = buildKey(email, action);
        redisTemplate.opsForValue().set(key, code, Duration.ofMinutes(5));
        emailService.sendVerificationCode(email, code, action);
    }
    public boolean verifyOtp(String email, String otp, String action) {
        String otpKey = buildKey(email, action);
        String storedOtp = redisTemplate.opsForValue().get(otpKey);

        if (storedOtp == null || !storedOtp.equals(otp)) {
            return false;
        }

        Map<Object, Object> tempData = redisTemplate.opsForHash().entries(otpKey);
        redisTemplate.delete(otpKey);

        if (tempData.isEmpty()) {
            return false;
        }

        int accountId = Integer.parseInt((String) tempData.get("accountId"));
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        if ("CHANGE_EMAIL".equals(action)) {
            String newEmail = (String) tempData.get("newEmail");
            account.setEmail(newEmail);
        } else if ("CHANGE_PASSWORD".equals(action)) {
            String newPassword = (String) tempData.get("newPassword");
            account.setPassword(passwordEncoder.encode(newPassword));
        }

        accountRepository.save(account);
        return true;
    }
}
