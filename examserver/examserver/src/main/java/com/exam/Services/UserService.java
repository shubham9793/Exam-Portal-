package com.exam.Services;

import com.exam.Model.User;
import com.exam.Model.UserRole;

import java.util.Set;

public interface UserService {

    // creating user
    User createUser(User user, Set<UserRole> userRoles) throws Exception;

    //get user by username
    User GetUser(String username);

    //get delete user by id
    void deleteuser(Long userid);

    //update the user
    User updateusers(User user, Long userid);
}
