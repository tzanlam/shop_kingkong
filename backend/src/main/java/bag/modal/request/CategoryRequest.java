package bag.modal.request;

import bag.modal.entity.Category;
import lombok.Data;

@Data
public class CategoryRequest {
    private String name;
    private String description;
    private String imageUrl;

    public Category populate(Category category){
        category.setName(name);
        category.setDescription(description);
        category.setImageUrl(imageUrl);
        return category;
    }


}
