package com.soumaya.users.repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.soumaya.users.entities.user;

public interface userRepository extends JpaRepository<user, Long>{
	
	user findByUsername(String username);
	Optional<user> findByEmail(String email);
}
