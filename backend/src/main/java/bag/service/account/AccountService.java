package bag.service.account;

import bag.modal.dto.AccountDto;
import bag.modal.request.AccountRequest;

import java.util.List;

public interface AccountService {
    List<AccountDto> getAll();
    AccountDto getById(int accountId);
    AccountDto addUser(AccountRequest request);
    AccountDto addAdmin(AccountRequest request);
    AccountDto updateInformation(AccountRequest request, int accountId);
    AccountDto changePassword(AccountRequest request, int accountId);
    AccountDto changeEmail(AccountRequest request, int accountId);
    AccountDto deleteAccount(int accountId, AccountRequest request);
}
