package bag.service.verification;

import bag.modal.entity.Account;
import bag.repository.AccountRepository;
import bag.service.mail.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class VerificationService {
    private final RedisTemplate<String, String> redisTemplate;
    private final EmailService emailService;
    private final AccountRepository accountRepository;

    private String generateOtp(){
        return String.valueOf(new Random().nextInt(90000)+10000);
    }

    private String buildKey(String email, String action) {
        return "otp:" + action + ":" + email;
    }

    public void createAndSendVerificationEmail(String email, String action){
        String code = generateOtp();
        String key = buildKey(email, action);
        redisTemplate.opsForValue().set(key, code, Duration.ofMinutes(5));
        emailService.sendVerificationCode(email, code, action);
    }

    public boolean verifyOtp(String email, String otp, String action){
        String key = buildKey(email, action);
        String storedOtp = redisTemplate.opsForValue().get(key);

        if( storedOtp == null || !storedOtp.equals(otp)){
            return false;
        }
        redisTemplate.delete(key);

        Account account = accountRepository.findByEmail(email).orElseThrow(
                () -> new RuntimeException("Account not found")
        );
        account.setStatus(Account.AccountStatus.ACTIVE);
        accountRepository.save(account);
        return true;
    }
}
