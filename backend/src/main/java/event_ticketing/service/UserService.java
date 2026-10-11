package event_ticketing.service;

import event_ticketing.entity.User;
import event_ticketing.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }

    public User saveUser(User user) {

        String password = user.getPassword();

        if (password == null ||
            !password.matches(
                "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$")) {

            throw new IllegalArgumentException(
                "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
            );
        }

        user.setPassword(
            passwordEncoder.encode(password)
        );

        return userRepository.save(user);
    }

    public User updateUser(int id, User user) {

        User existingUser =
                userRepository.findById(id).orElseThrow();

        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());

        if (user.getPassword() != null &&
            !user.getPassword().isBlank()) {

            String password = user.getPassword();

            if (!password.matches(
                    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$")) {

                throw new IllegalArgumentException(
                    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
                );
            }

            existingUser.setPassword(
                passwordEncoder.encode(password)
            );
        }

        existingUser.setPhone(user.getPhone());
        existingUser.setRole(user.getRole());

        return userRepository.save(existingUser);
    }

    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}