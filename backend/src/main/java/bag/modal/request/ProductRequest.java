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
    private List<String> images;
    private int categoryId;
    private List<String> reviews;
    private int cartId;


    public void populate(Product product){
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setQuantity(quantity);
    }

}
