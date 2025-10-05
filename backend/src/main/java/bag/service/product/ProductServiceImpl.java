package bag.service.product;

import bag.modal.dto.ProductDto;
import bag.modal.entity.Cart;
import bag.modal.entity.Category;
import bag.modal.entity.Product;
import bag.modal.request.ProductRequest;
import bag.repository.CartRepository;
import bag.repository.CategoryRepository;
import bag.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final CartRepository cartRepository;


    public ProductServiceImpl(ProductRepository productRepository, CategoryRepository categoryRepository, CartRepository cartRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.cartRepository = cartRepository;
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
            Category category = null;
            if (request.getCategoryId() > 0) {
                category = categoryRepository.findById(request.getCategoryId())
                        .orElse(null);
            }
            Cart cart = cartRepository.findById(request.getCartId())
                    .orElseThrow(() -> new RuntimeException(request.getCartId() + "not found"));
            Product product = new Product();
            request.populate(product);
            product.setCart(cart);
            product.setCategory(category);
            productRepository.save(product);
            return new ProductDto(product);
        } catch (Exception e) {
            throw new RuntimeException("Create product failed! " +e.getMessage());
        }
    }




    @Override
    public ProductDto updateProduct(ProductRequest request, int id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        try {
            request.populate(product);
            product.setCategory(category);
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