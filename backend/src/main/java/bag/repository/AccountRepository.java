package bag.repository;

import bag.modal.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    @Query("select a from Account a where a.email = :email")
    Optional<Account> findByEmail(@Param("email")String email);
}
