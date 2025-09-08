package bag.service.account;

import bag.modal.dto.AccountDto;
import bag.modal.request.AccountRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    @Override
    public AccountDto getAll() {
        return null;
    }

    @Override
    public AccountDto getById(int accountId) {
        return null;
    }

    @Override
    public AccountDto addUser(AccountRequest request) {
        return null;
    }

    @Override
    public AccountDto addAdmin(AccountRequest request) {
        return null;
    }

    @Override
    public AccountDto updateInformation(AccountRequest request, int accountId) {
        return null;
    }

    @Override
    public AccountDto changePassword(AccountRequest request, int accountId) {
        return null;
    }

    @Override
    public AccountDto changeEmail(AccountRequest request, int accountId) {
        return null;
    }

    @Override
    public AccountDto deleteAccount(int accountId) {
        return null;
    }
}
