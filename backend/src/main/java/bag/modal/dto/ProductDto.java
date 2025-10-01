package bag.modal.dto;

import bag.modal.entity.Product;
import bag.modal.entity.ProductImage;
import lombok.Data;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class ProductDto {
    private int id;
    private String name;
    private String description;
    private double price;
    private int quantity;
    private List<String> images;
    private int categoryId;


    public ProductDto(Product product){
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.price =  product.getPrice();
        this.quantity = product.getQuantity();
        this.images = product.getImages() != null
                ? product.getImages().stream()
                .map(ProductImage::getImageUrl)
                .collect(Collectors.toList())
                : Collections.emptyList();
        this.categoryId = product.getCategory() != null ? product.getCategory().getId() : 0;

    }
}
