package com.exam;

import com.exam.Helper.UserFoundException;
import com.exam.Model.Role;
import com.exam.Model.User;
import com.exam.Model.UserRole;
import com.exam.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
@Configuration
public class ExamserverApplication implements CommandLineRunner {

	@Autowired
	private UserService userService;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(ExamserverApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Starting.... excution code");
 		try {
			User user = new User();
			user.setFirstname("shubham");
			user.setLastname("sahu");
			user.setUsername("shubham123");
			user.setPassword(this.bCryptPasswordEncoder.encode("shubham"));
			user.setEmail("shubham@gmail.com");
			user.setProfile("default.png");

			Role role1 = new Role();
			role1.setRoleid(44L);
			role1.setRoleName("ADMIN");

			Set<UserRole> userRoleSet = new HashSet<>();
			UserRole userRole = new UserRole();
			userRole.setRole(role1);
			userRole.setUser(user);

			userRoleSet.add(userRole);
			User user1 = this.userService.createUser(user, userRoleSet);
			System.out.println("New user created -> " + user1.getUsername());
		}catch (UserFoundException e) {
			 e.printStackTrace();
		}

	}
}
