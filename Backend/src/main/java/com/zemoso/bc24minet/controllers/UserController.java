package com.zemoso.bc24minet.controllers;


import com.zemoso.bc24minet.dto.UserDTO;
import com.zemoso.bc24minet.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigInteger;

@Slf4j
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public UserDTO fetchUsers() {
        log.info("User Controller");
        return userService.getUserById(BigInteger.ONE);
    }

}
