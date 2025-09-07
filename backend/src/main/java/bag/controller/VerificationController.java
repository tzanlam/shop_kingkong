package bag.controller;

import bag.service.verification.VerificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/verify")
@RequiredArgsConstructor
public class VerificationController {
    private final VerificationService verificationService;

    @PostMapping
    public ResponseEntity<?> verify(@RequestParam("email") String email, @RequestParam("otp") String otp, @RequestParam("action") String action) {
        try {
            return ResponseEntity.ok(verificationService.verifyOtp(email, otp, action));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
