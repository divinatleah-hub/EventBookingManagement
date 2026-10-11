package event_ticketing.controller;

import event_ticketing.entity.User;
import event_ticketing.repository.UserRepository;
import event_ticketing.service.EmailService;
import event_ticketing.service.OtpService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/otp")
@CrossOrigin(origins = "*")
public class OtpController {

    private final UserRepository userRepository;
    private final OtpService otpService;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    private final Map<String, String> otpStore =
            new ConcurrentHashMap<>();

    public OtpController(
            UserRepository userRepository,
            OtpService otpService,
            EmailService emailService,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.otpService = otpService;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/send")
    public String sendOtp(
            @RequestBody Map<String, String> request) {

        String email = request.get("email");
        String password = request.get("password");

        User user =
                userRepository.findByEmail(email)
                        .orElse(null);

        if (user == null) {
            return "Invalid email or password";
        }

        if (!passwordEncoder.matches(
                password,
                user.getPassword())) {

            return "Invalid email or password";
        }

        String otp =
                otpService.generateOtp();

        otpStore.put(email, otp);

        emailService.sendOtp(email, otp);

        return "OTP sent successfully";
    }

    @PostMapping("/verify")
    public String verifyOtp(
            @RequestBody Map<String, String> request) {

        String email = request.get("email");
        String otp = request.get("otp");

        String savedOtp =
                otpStore.get(email);

        if (savedOtp == null) {
            return "OTP expired or not found";
        }

        if (!savedOtp.equals(otp)) {
            return "Invalid OTP";
        }

        otpStore.remove(email);

        return "Login successful";
    }
}