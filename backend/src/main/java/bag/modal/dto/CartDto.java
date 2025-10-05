package bag.modal.dto;

import bag.modal.entity.Account;
import bag.modal.entity.Cart;
import bag.modal.entity.Product;
import lombok.Data;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class CartDto {
    private int id;
    private int accountId;
    private List<ProductDto> products;
    private double price;
    private int quantity;
    private double totalPrice;
    public void calculateTotalPrice(){
        this.totalPrice = this.price * this.quantity;
    }

    public CartDto(Cart cart){
        this.id = cart.getId();
        this.accountId = cart.getAccount().getId();
        this.products = cart.getProducts() != null
                ? cart.getProducts().stream()
                .map(ProductDto::new).collect(Collectors.toList()) :
                Collections.emptyList();
        this.price = cart.getPrice();
        this.quantity = cart.getQuantity();
        this.calculateTotalPrice();

    }
}
