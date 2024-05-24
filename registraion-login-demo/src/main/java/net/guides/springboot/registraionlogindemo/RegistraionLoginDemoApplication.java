package net.guides.springboot.registraionlogindemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("net.guides.springboot.registraionlogindemo.model")
public class RegistraionLoginDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(RegistraionLoginDemoApplication.class, args);
	}

}
