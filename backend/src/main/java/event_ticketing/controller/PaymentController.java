package event_ticketing.controller;

import event_ticketing.entity.Payment;
import event_ticketing.service.PaymentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/{id}")
    public Optional<Payment> getPaymentById(@PathVariable("id") int id) {
        return paymentService.getPaymentById(id);
    }

    @GetMapping("/transaction/{transactionId}")
    public Optional<Payment> getPaymentByTransactionId(
            @PathVariable("transactionId") String transactionId) {
        return paymentService.getPaymentByTransactionId(transactionId);
    }

    @PostMapping
    public Payment createPayment(@RequestBody Payment payment) {
        return paymentService.savePayment(payment);
    }

    @PutMapping("/{id}")
    public Payment updatePayment(
            @PathVariable("id") int id,
            @RequestBody Payment payment) {
        return paymentService.updatePayment(id, payment);
    }

    @DeleteMapping("/{id}")
    public void deletePayment(@PathVariable("id") int id) {
        paymentService.deletePayment(id);
    }
}