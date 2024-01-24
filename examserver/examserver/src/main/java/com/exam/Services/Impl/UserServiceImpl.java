package com.exam.Services.Impl;

import com.exam.Helper.UserFoundException;
import com.exam.Helper.UserNotFoundException;
import com.exam.Model.User;
import com.exam.Model.UserRole;
import com.exam.Repository.RoleRepository;
import com.exam.Repository.UserRepository;
import com.exam.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.Optional;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    //creating user
    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {

       User local =  this.userRepository.findByUsername(user.getUsername());

       if(local!=null) {
           System.out.println("User is already is there !");
           throw new UserFoundException();
       } else {
            // user create
           for(UserRole ur:userRoles) {
               roleRepository.save(ur.getRole());
           }
           user.getUserRoles().addAll(userRoles);
           local = this.userRepository.save(user);
       }
        return local;
    }

    //Geting user by username
    @Override
    public User GetUser(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override
    public void deleteuser(Long userid) {
        this.userRepository.deleteById(userid);
    }

    @Override
    public User updateusers(User user, Long userid) {
        Optional<User> userOptional = userRepository.findById(userid);
        if(userOptional.isPresent()) {
            System.out.println("User is not present !");
        }
        user.setId(userid);
        userRepository.save(user);
        return user;
    }

}
