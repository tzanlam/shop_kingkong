package bag.modal.request;

import lombok.Data;

@Data
public class ReviewRequest {
    private int productId;
    private int accountId;
    private int rating;
    private String comment;
}
