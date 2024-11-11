package com.soumaya.users.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.soumaya.users.entities.role;

public interface roleRepository extends JpaRepository<role, Long> {

	role findByRole(String role);
}
