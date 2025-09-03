package bag.modal.request;

import bag.modal.entity.Account;
import lombok.Data;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Data
public class AccountRequest {
    private String username;
    private String password;
    private String email;
    private String phoneNumber;
    private String city;
    private String address;

    public Account register(){
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        Account account = new Account();
        account.setUsername(username);
        account.setPassword(passwordEncoder.encode(password));
        account.setEmail(email);
        account.setPhoneNumber(phoneNumber);
        account.setCity(city);
        account.setAddress(address);
        account.setPosition(Account.Position.USER);
        account.setStatus(Account.AccountStatus.INACTIVE);
        return account;
    }

    public Account changeEmail(String email, Account account){
        account.setEmail(email);
        return account;
    }

    public Account changePassword(String password, Account account){
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        account.setPassword(passwordEncoder.encode(password));
        return account;
    }

    public Account updateInformation(Account account){
        account.setUsername(username);
        account.setPhoneNumber(phoneNumber);
        account.setCity(city);
        account.setAddress(address);
        return account;
    }
}
