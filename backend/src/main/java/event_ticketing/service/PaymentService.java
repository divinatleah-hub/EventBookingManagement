package event_ticketing.service;

import event_ticketing.entity.Payment;
import event_ticketing.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Optional<Payment> getPaymentById(int id) {
        return paymentRepository.findById(id);
    }

    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public Payment updatePayment(int id, Payment payment) {
        Payment existingPayment = paymentRepository.findById(id).orElseThrow();

        existingPayment.setPaymentMethod(payment.getPaymentMethod());
        existingPayment.setTransactionId(payment.getTransactionId());
        existingPayment.setAmount(payment.getAmount());
        existingPayment.setPaymentStatus(payment.getPaymentStatus());
        existingPayment.setPaymentDate(payment.getPaymentDate());
        existingPayment.setBooking(payment.getBooking());

        return paymentRepository.save(existingPayment);
    }

    public void deletePayment(int id) {
        paymentRepository.deleteById(id);
    }

    public Optional<Payment> getPaymentByTransactionId(String transactionId) {
        return paymentRepository.findByTransactionId(transactionId);
    }
}