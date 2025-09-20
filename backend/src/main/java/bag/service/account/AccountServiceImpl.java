package bag.service.account;

import bag.modal.dto.AccountDto;
import bag.modal.entity.Account;
import bag.modal.request.AccountRequest;
import bag.repository.AccountRepository;
import bag.service.verification.VerificationService;
import bag.support.method.Support;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;
    private final VerificationService verificationService;
    private final RedisTemplate<String, String> redisTemplate;

    @Override
    public List<AccountDto> getAll() {
        return accountRepository.findAll().stream().map(AccountDto::new).collect(Collectors.toList());
    }

    @Override
    public AccountDto getById(int accountId) {
        Account account = accountRepository.findById(accountId).orElseThrow(
                () -> new RuntimeException("Account not found")
        );
        return new AccountDto(account);
    }

    @Override
    public AccountDto addUser(AccountRequest request) {
        Account account = request.register();
        accountRepository.save(account);
        verificationService.createAndSendVerificationEmail(request.getEmail(), "REGISTER");
        return null;
    }

    @Override
    public AccountDto addAdmin(AccountRequest request) {
        Account account = request.registerAdmin();
        accountRepository.save(account);
        verificationService.createAndSendVerificationEmail(request.getEmail(), "REGISTER_ADMIN");
        return new AccountDto(account);
    }

    @Override
    public AccountDto updateInformation(AccountRequest request, int accountId) {
        Account account = accountRepository.findById(accountId).orElseThrow(
                () -> new RuntimeException("Account not found")
        );
        request.updateInformation(account);
        accountRepository.save(account);
        return new AccountDto(account);
    }

    @Override
    public void changePassword(String newPassword, int accountId) {
        Account account = accountRepository.findById(accountId).orElseThrow(
                () -> new RuntimeException("Account not found")
        );
        verificationService.createAndSendVerificationEmail(account.getEmail(), "CHANGE_PASSWORD");
        String key = Support.buildKey(account.getEmail(), "CHANGE_PASSWORD");
        redisTemplate.opsForHash().put(key, "accountId", String.valueOf(accountId));
        redisTemplate.opsForHash().put(key, "newPassword", newPassword);
        redisTemplate.expire(key, Duration.ofMinutes(5));

    }

    @Override
    public void changeEmail(String newEmail, int accountId) {
        Account account = accountRepository.findById(accountId).orElseThrow(
                () -> new RuntimeException("Account not found")
        );
        verificationService.createAndSendVerificationEmail(newEmail, "CHANGE_EMAIL");
        String key = Support.buildKey(account.getEmail(), "CHANGE_EMAIL");
        redisTemplate.opsForHash().put(key, "accountId", String.valueOf(accountId));
        redisTemplate.opsForHash().put(key, "newEmail", newEmail);
        redisTemplate.expire(key, Duration.ofMinutes(5));
    }

    @Override
    public AccountDto deleteAccount(int accountId, AccountRequest request) {
        Account account = accountRepository.findById(accountId).orElseThrow(
                () -> new RuntimeException("Account not found")
        );
        request.deleteAccount(account);
        accountRepository.save(account);
        return new AccountDto(account);
    }
}