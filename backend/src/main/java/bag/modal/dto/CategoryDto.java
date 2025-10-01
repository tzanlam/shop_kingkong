package bag.modal.dto;

import bag.modal.entity.Category;
import bag.modal.entity.Product;
import lombok.Data;

@Data
public class CategoryDto {
    private int id;
    private String name;
    private String decription;
    private String imageUrl;

    public CategoryDto(Category category){
        this.id = category.getId();
        this.name = category.getName();
        this.decription = category.getDescription();
        this.imageUrl =  category.getImageUrl();


    }
}
