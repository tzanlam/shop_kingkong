package bag.repository;

import bag.modal.entity.Cart;
import bag.modal.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
    @Query("select c.products from Cart c where c.id = :cartId")
    List<Product> findProducts(@Param("CartId")int cartId) ;
}
