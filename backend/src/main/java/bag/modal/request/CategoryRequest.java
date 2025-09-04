package bag.modal.request;

import bag.modal.entity.Category;
import lombok.Data;

@Data
public class CategoryRequest {
    private String name;
    private String description;

    public void createCategory(){
        Category category = new Category();
        category.setName(name);
        category.setDescription(description);
    }
}
