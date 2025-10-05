package bag.service.cart;

import bag.modal.dto.CartDto;
import bag.modal.dto.CategoryDto;
import bag.modal.dto.ProductDto;
import bag.modal.entity.Account;
import bag.modal.entity.Cart;
import bag.modal.entity.Product;
import bag.modal.request.CartRequest;
import bag.repository.AccountRepository;
import bag.repository.CartRepository;
import bag.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService{
    private final CartRepository cartRepository;
    private final AccountRepository accountRepository;
    private final ProductRepository productRepository;

    public CartServiceImpl(CartRepository cartRepository, AccountRepository accountRepository, ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.accountRepository = accountRepository;
        this.productRepository = productRepository;
    }

    @Override
    public List<CartDto> getAllCarts() {
        return cartRepository.findAll().stream().map(CartDto::new).collect(Collectors.toList());
    }

    @Override
    public CartDto getCartById(int id) {
        Cart cart = cartRepository.findById(id).orElseThrow(() -> new RuntimeException("Cart not found"));
        return new CartDto(cart);
    }

    @Override
    public CartDto createCart(CartRequest request) {
        try {
            Account account = accountRepository.findById(request.getAccountId())
                    .orElseThrow(() -> new RuntimeException(request.getAccountId() + "not found"));

            Cart cart = new Cart();
            cart.setAccount(account);

            request.populate(cart);
            cartRepository.save(cart);
            return new CartDto(cart);
        }catch (Exception e){
            throw new RuntimeException("Create failed");
        }
    }

    @Override
    public CartDto updateCart(CartRequest request, int id) {
        try {

            Account account = accountRepository.findById(request.getAccountId())
                    .orElseThrow(() -> new RuntimeException(request.getAccountId() + "not found"));
            Cart cart = cartRepository.findById(id).orElseThrow(() -> new RuntimeException("Cart not found"));
            request.populate(cart);
            cart.setAccount(account);

            cartRepository.save(cart);
            return new CartDto(cart);
        }catch (Exception e){
            throw new RuntimeException("Update failed");
        }
    }

    @Override
    public void deleteCart(int id) {
        Cart cart = cartRepository.findById(id).orElseThrow(() -> new RuntimeException("Cart not found"));
        cartRepository.delete(cart);
    }
}
