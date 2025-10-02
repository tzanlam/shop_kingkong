package bag.controller;

import bag.modal.request.ProductImageRequest;
import bag.modal.request.ProductRequest;
import bag.service.productImage.ProductImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/productImage")
@RequiredArgsConstructor
public class ProductImageController {
    private final ProductImageService productImageService;
    @GetMapping
    public ResponseEntity<?> getAll(){
        try{
            return ResponseEntity.ok(productImageService.getAll());
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/{id}")

    public ResponseEntity<?> getById(@PathVariable("id") int id){
        try{
            return ResponseEntity.ok(productImageService.getProductImageById(id));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody ProductImageRequest request){
        try{
            return ResponseEntity.ok(productImageService.createProductImage(request));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody ProductImageRequest request, @PathVariable int id){
        try{
            return ResponseEntity.ok(productImageService.updateProductImage(request,id));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
