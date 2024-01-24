package com.exam.Controller;

import com.exam.Helper.UserFoundException;
import com.exam.Model.Role;
import com.exam.Model.User;
import com.exam.Model.UserRole;
import com.exam.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@CrossOrigin("*")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;





    // creating user
    @PostMapping("/")
    public User createUser(@RequestBody User user) throws Exception {

        user.setProfile("default.png");
        //importing password with bcriptPassword
       user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
        Set<UserRole> roles = new HashSet<>();
        Role role = new Role();
        role.setRoleid(45L);
        role.setRoleName("NORMAL");

        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);
        roles.add(userRole);

        return this.userService.createUser(user,roles);
    }

    //Fetch The data
    @GetMapping("/{username}")
    public User GetUser(@PathVariable("username") String username) {

        return this.userService.GetUser(username);
    }

    // delete the user by its id
    @DeleteMapping("/{userid}")
    public void  deleteUser(@PathVariable("userid") Long userid) {
        this.userService.deleteuser(userid);
    }

    // update user
    @PutMapping("/{userid}")
    public User updateuser(@RequestBody User user , @PathVariable("userid") Long userid) {

        this.userService.updateusers(user,userid);
        return user;
    }

    @ExceptionHandler(UserFoundException.class)
    public ResponseEntity<?>exceptionHandler(UserFoundException ex) {
        return new  ResponseEntity<ResponseEntity>(HttpStatus.FOUND);
    }

    @GetMapping("/test")
    public String test() {
        return "Welcome to backend api of ExamPortal";
    }

}
