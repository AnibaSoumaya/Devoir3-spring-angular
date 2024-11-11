package com.soumaya.users;

import org.springframework.beans.factory.annotation.Autowired;
import com.soumaya.users.service.userService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.soumaya.users.entities.role;
import com.soumaya.users.entities.user;

import jakarta.annotation.PostConstruct;

@SpringBootApplication
public class UsersMicroserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(UsersMicroserviceApplication.class, args);
	}
	
	@Autowired
	userService userService;
	/*
	@PostConstruct
	void init_users() {
		
	//ajouter les rôles
	userService.addRole(new role(null,"ADMIN"));
	userService.addRole(new role(null,"USER"));
	
	//ajouter les users
	userService.saveUser(new user(null,"admin","123",true,null));
	userService.saveUser(new user(null,"soumaya","123",true,null));
	userService.saveUser(new user(null,"ranim","123",true,null));
	
	//ajouter les rôles aux users
	userService.addRoleToUser("admin", "ADMIN");
	userService.addRoleToUser("admin", "USER");
	userService.addRoleToUser("soumaya", "USER");
	userService.addRoleToUser("ranim", "USER");
	}*/
	
	/*@Bean
	BCryptPasswordEncoder getBCE() {
		return new BCryptPasswordEncoder();
	}*/

}
