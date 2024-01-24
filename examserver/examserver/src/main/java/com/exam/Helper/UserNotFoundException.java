package com.exam.Helper;

public class UserNotFoundException  extends  Exception{

    public UserNotFoundException(String message) {
        super(message);
    }

    public UserNotFoundException() {
        super("User with this Username not found there in DB !");
    }

}
