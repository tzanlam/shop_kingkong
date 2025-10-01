package bag.modal.dto;

import bag.modal.entity.Product;
import bag.modal.entity.ProductImage;
import lombok.Data;

import java.util.List;

@Data
public class ProductDto {
    private int id;
    private String name;
    private String description;
    private double price;
    private int quantity;
    private List<ProductImage> images;
    private int categoryId;


    public ProductDto(Product product){
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.price =  product.getPrice();
        this.quantity = product.getQuantity();
        this.images = product.getImages();
        this.categoryId = product.getCategory().getId();

    }
}
