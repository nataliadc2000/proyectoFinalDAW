package net.guides.springboot.registraionlogindemo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.guides.springboot.registraionlogindemo.model.User;
import net.guides.springboot.registraionlogindemo.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
public class UserController {
      @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }
    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
    }
}
