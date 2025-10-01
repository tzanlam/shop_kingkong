package bag.repository;

import bag.modal.entity.Product;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    // Tìm sản phẩm theo tên gần đúng
    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> searchByName(@Param("keyword") String keyword);

    // Tìm tất cả sản phẩm theo category
    @Query("SELECT p FROM Product p WHERE p.category.id = :categoryId")
    List<Product> findByCategory(@Param("categoryId") int categoryId);

    // Lấy sản phẩm kèm reviews
    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.reviews WHERE p.id = :productId")
    Optional<Product> findByIdWithReviews(@Param("productId") int productId);

    // Lấy sản phẩm trong khoảng giá
    @Query("SELECT p FROM Product p WHERE p.price BETWEEN :min AND :max")
    List<Product> findByRangePrice(@Param("min") double min, @Param("max") double max);

}
