package bag.modal.request;

import bag.modal.entity.Account;
import bag.modal.entity.Cart;
import bag.modal.entity.Product;
import lombok.Data;

@Data
public class CartRequest {
    private Account account;
    private Product product;
    private double price;
    private int quantity;
    private double totalPrice;

    public void createCart(){
        Cart cart = new Cart();
        cart.setPrice(price);
        cart.setQuantity(quantity);
        cart.setTotalPrice(totalPrice);
}
    public void updateCart(Cart cart){
        cart.setPrice(price);
        cart.setQuantity(quantity);
        cart.setTotalPrice(totalPrice);
    }
}
