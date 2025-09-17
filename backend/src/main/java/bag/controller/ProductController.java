package bag.controller;

import bag.modal.request.ProductRequest;
import bag.service.product.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<?> getAllProducts(){
        try{
            return ResponseEntity.ok(productService.getAllProducts());
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable("id") int id){
        try{
            return ResponseEntity.ok(productService.getProductById(id));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProduct(@RequestBody ProductRequest request){
        try{
            return ResponseEntity.ok(productService.addProduct(request));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateProduct(@RequestBody ProductRequest request, @PathVariable int id){
        try{
            return ResponseEntity.ok(productService.updateProduct(request,id));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteAccount(@PathVariable int id){
//        try{
//            return ResponseEntity.ok(productService.deleteProductById(id));
//        }catch (Exception e){
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }
}
