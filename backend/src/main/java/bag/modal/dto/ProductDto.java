package bag.modal.dto;

import bag.modal.entity.Product;
import bag.modal.entity.ProductImage;
import bag.modal.entity.Review;
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
    private List<ReviewDto> reviews;
    private int categoryId;
    private int cartId;


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
        this.reviews = product.getReviews() != null
                ? product.getReviews().stream()
                .map(ReviewDto::new)
                .collect(Collectors.toList())
                : Collections.emptyList();
        this.categoryId = product.getCategory().getId();
        this.cartId = product.getCart().getId();

    }
}
