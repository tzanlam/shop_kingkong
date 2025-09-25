package bag.support.scheduling;

import bag.repository.AccountRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class DeleteAccountNotVerified {
    private final AccountRepository accountRepository;

    @Value("${app.account.verification-ttl}")
    private Duration duration;

    @Scheduled
    @Transactional
    public void deleteAccount() {
        LocalDateTime cutoff = LocalDateTime.now().minus(duration);
        long deleted = accountRepository.deleteIfAccountNotVerified(cutoff);
        log.info("Deleted {} unverified accounts created before {}", deleted, cutoff);
    }
}
