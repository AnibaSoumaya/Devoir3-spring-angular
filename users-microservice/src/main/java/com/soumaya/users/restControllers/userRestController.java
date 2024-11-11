package com.soumaya.users.restControllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.soumaya.users.entities.user;
import com.soumaya.users.service.userService;
import com.soumaya.users.service.register.RegistrationRequest;

@RestController
@CrossOrigin(origins = "*")
public class userRestController {

	@Autowired
	userService userService;
	@GetMapping("all")
	public List<user> getAllUsers() {
	return userService.findAllUsers();
	}
	
	@PostMapping("/register")
	public user register(@RequestBody RegistrationRequest request)
	{
	return userService.registerUser(request);
	}
	
	@GetMapping("/verifyEmail/{token}")
	public user verifyEmail(@PathVariable("token") String token){
	return userService.validateToken(token);
	}
}
