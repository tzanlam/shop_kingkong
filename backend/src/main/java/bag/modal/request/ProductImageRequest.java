package bag.modal.request;

import bag.modal.entity.Product;
import lombok.Data;

@Data
public class ProductImageRequest {
    private int productId;
    private String imageUrl;
    private boolean isMain;
}
