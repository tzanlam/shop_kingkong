package bag.service.product;

import bag.modal.dto.ProductDto;
import bag.modal.request.ProductRequest;

import java.util.List;

public interface ProductService {
    List<ProductDto> getAllProducts();

    ProductDto getProductById(int productId);

    ProductDto addProduct(ProductRequest request);

    ProductDto updateProduct(ProductRequest request, int id);
    void deleteProductById(int productId);
}
