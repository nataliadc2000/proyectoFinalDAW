package net.guides.springboot.registraionlogindemo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import net.guides.springboot.registraionlogindemo.model.User;

public interface UserRepository extends JpaRepository<User,Long>{
    Optional<User> findByEmailAndPassword(String email,String password);
}
