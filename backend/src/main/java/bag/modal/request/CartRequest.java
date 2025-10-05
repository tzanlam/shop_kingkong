package bag.modal.request;

import bag.modal.dto.ProductDto;
import bag.modal.entity.Account;
import bag.modal.entity.Cart;
import bag.modal.entity.Product;
import lombok.Data;

import java.util.List;

@Data
public class CartRequest {
    private int accountId;
    private List<String> products;
    private double price;
    private int quantity;
    private double totalPrice;

    public void populate(Cart cart){
        cart.setPrice(price);
        cart.setQuantity(quantity);
        cart.setTotalPrice(price * quantity);
}
}
