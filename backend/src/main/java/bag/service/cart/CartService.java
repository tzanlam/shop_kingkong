package bag.service.cart;

import bag.modal.dto.CartDto;
import bag.modal.entity.Cart;
import bag.modal.request.CartRequest;

import java.util.List;

public interface CartService {
    List<CartDto> getAllCarts();

    CartDto getCartById(int id);

    CartDto createCart(CartRequest request);

    CartDto updateCart(CartRequest request, int id);

    void deleteCart(int id);

}
