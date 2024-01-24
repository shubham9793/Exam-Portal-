package com.exam.Helper;

public class UserFoundException extends Exception{

    public UserFoundException(String message) {
        super(message);
    }

    public UserFoundException() {
        super("User with this Username is already there in DB ! try with an other username");
    }
}
