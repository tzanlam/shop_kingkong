package bag.service.product;

import bag.modal.dto.ProductDto;
import bag.modal.entity.Product;
import bag.modal.request.ProductRequest;
import bag.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream()
                .map(ProductDto::new)
                .collect(Collectors.toList());
    }

    @Override
    public ProductDto getProductById(int productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return new ProductDto(product);
    }

    @Override
    public ProductDto addProduct(ProductRequest request) {
        try {
            Product product = new Product();
            request.setProduct(product);
            productRepository.save(product);
            return new ProductDto(product);
        } catch (Exception e) {
            throw new RuntimeException("Create product failed");
        }
    }

    @Override
    public ProductDto updateProduct(ProductRequest request, int productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        try {
            request.setProduct(product);
            productRepository.save(product);
            return new ProductDto(product);
        } catch (Exception e) {
            throw new RuntimeException("Update product failed");
        }
    }

    @Override
    public void deleteProductById(int productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        productRepository.delete(product);
    }
}