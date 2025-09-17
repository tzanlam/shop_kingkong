package bag.modal.dto;

import bag.modal.entity.Product;
import lombok.Data;

@Data
public class ProductDto {
    private int id;
    private String name;
    private String description;
    private double price;
    private int quantity;
    private String image;
    private String category;
    private String review;

    public ProductDto(Product product){
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.price =  product.getPrice();
        this.quantity = product.getQuantity();

    }
}
