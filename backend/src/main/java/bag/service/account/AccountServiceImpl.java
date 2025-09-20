package bag.service.account;

import bag.modal.dto.AccountDto;
import bag.modal.entity.Account;
import bag.modal.request.AccountRequest;
import bag.repository.AccountRepository;
import bag.service.verification.VerificationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;
    private final VerificationService verificationService;

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
    @Transactional
    public AccountDto updateInformation(AccountRequest request, int accountId) {
        Account account = accountRepository.findById(accountId).orElseThrow(
                () -> new RuntimeException("Account not found")
        );
        request.updateInformation(account);
        accountRepository.save(account);
        return new AccountDto(account);
    }

    @Override
    @Transactional
    public AccountDto changePassword(AccountRequest request, int accountId) {
        Account account = accountRepository.findById(accountId).orElseThrow(
                () -> new RuntimeException("Account not found")
        );
        request.changePassword(account);
        accountRepository.save(account);
        verificationService.createAndSendVerificationEmail(request.getEmail(), "CHANGE_PASSWORD");
        return new AccountDto(account);
    }

    @Override
    @Transactional
    public AccountDto changeEmail(AccountRequest request, int accountId) {
        Account account = accountRepository.findById(accountId).orElseThrow(
                () -> new RuntimeException("Account not found")
        );
        request.changeEmail(account);
        accountRepository.save(account);
        verificationService.createAndSendVerificationEmail(request.getEmail(), "CHANGE EMAIL");
        return new AccountDto(account);
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