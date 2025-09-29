package bag.repository;

import bag.modal.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query("select ct.products from Category ct where ca.id :categoryId")
    List<Product> findProducts(@Param("categoryId") int categoryId);
}
