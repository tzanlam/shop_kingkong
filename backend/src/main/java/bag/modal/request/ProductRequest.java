package bag.modal.request;

import bag.modal.entity.Category;
import bag.modal.entity.Product;
import bag.modal.entity.ProductImage;
import bag.modal.entity.Review;
import lombok.Data;

import java.util.List;

@Data
public class ProductRequest {
    private String name;
    private String description;
    private double price;
    private int quantity;
    private ProductImage image;
    private Category category;
    private Review review;

    public void createProduct(){
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setQuantity(quantity);
    }
    public void updateProduct(Product product){
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setQuantity(quantity);
    }
}
