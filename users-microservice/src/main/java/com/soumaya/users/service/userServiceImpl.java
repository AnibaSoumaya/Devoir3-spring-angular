package com.soumaya.users.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.soumaya.users.entities.role;
import com.soumaya.users.entities.user;
import com.soumaya.users.repos.roleRepository;
import com.soumaya.users.repos.userRepository;
import com.soumaya.users.service.exceptions.EmailAlreadyExistsException;
import com.soumaya.users.service.exceptions.ExpiredTokenException;
import com.soumaya.users.service.exceptions.InvalidTokenException;
import com.soumaya.users.service.register.RegistrationRequest;
import com.soumaya.users.service.register.VerificationToken;
import com.soumaya.users.service.register.VerificationTokenRepository;
import com.soumaya.users.util.EmailSender;


@Transactional
@Service
public class userServiceImpl implements userService{

	@Autowired
	userRepository userRep;
	@Autowired
	roleRepository roleRep;
	
	@Autowired
	EmailSender emailSender;
	
	@Autowired
	VerificationTokenRepository verificationTokenRepo;
	
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;
	@Override
	public user saveUser(user user) {
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		return userRep.save(user);
	}
	@Override
	public user addRoleToUser(String username, String rolename) {
		user usr = userRep.findByUsername(username);
		role r = roleRep.findByRole(rolename);
		usr.getRoles().add(r);
		return usr;
	}
	@Override
	public role addRole(role role) {
		return roleRep.save(role);
	}
	@Override
	public user findUserByUsername(String username) {
		return userRep.findByUsername(username);
	}
	
	@Override
	public List<user> findAllUsers() {
	return userRep.findAll();
	}
	@Override
	public user registerUser(RegistrationRequest request) {
		Optional<user> optionaluser = userRep.findByEmail(request.getEmail());
		if(optionaluser.isPresent())
		throw new EmailAlreadyExistsException("email déjà existant!");
		
		user newUser = new user();
		newUser.setUsername(request.getUsername());
		newUser.setEmail(request.getEmail());
		newUser.setPassword(bCryptPasswordEncoder.encode(request.getPassword()));
		newUser.setEnabled(false);
		userRep.save(newUser);
		//ajouter à newUser le role par défaut USER
		role r = roleRep.findByRole("USER");
		List<role> roles = new ArrayList<>();
		roles.add(r);
		newUser.setRoles(roles);
		
		//génére le code secret
		String code = this.generateCode();
		VerificationToken token = new VerificationToken(code, newUser);
		verificationTokenRepo.save(token);
		//envoyer par email pour valider l'email de l'utilisateur
		sendEmailUser(newUser,token.getToken());
		
		return userRep.save(newUser);


	}
	private String generateCode() {
		Random random = new Random();
		Integer code = 100000 + random.nextInt(900000);
		return code.toString();
	}
	
	@Override
	public void sendEmailUser(user u, String code) {
		String emailBody ="Bonjour "+ "<h1>"+u.getUsername() +"</h1>" +
		" Votre code de validation est "+"<h1>"+code+"</h1>";
		emailSender.sendEmail(u.getEmail(), emailBody);
	}
	
	@Override
	public user validateToken(String code) {
		VerificationToken token = verificationTokenRepo.findByToken(code);
		if(token == null){
		throw new InvalidTokenException("Invalid Token");
		}
		user user = token.getUser();
		Calendar calendar = Calendar.getInstance();
		if ((token.getExpirationTime().getTime() - calendar.getTime().getTime()) <= 0){
		verificationTokenRepo.delete(token);
		throw new ExpiredTokenException("expired Token");
		}
		user.setEnabled(true);
		userRep.save(user);
		return user;
	}
	
	
	

}
