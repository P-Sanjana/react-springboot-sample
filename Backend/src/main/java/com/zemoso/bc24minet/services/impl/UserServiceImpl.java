package com.zemoso.bc24minet.services.impl;

import com.zemoso.bc24minet.dto.UserDTO;
import com.zemoso.bc24minet.entities.User;
import com.zemoso.bc24minet.mapper.UserMapper;
import com.zemoso.bc24minet.repositories.UserRepository;
import com.zemoso.bc24minet.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDTO getUserById(BigInteger id) {
        User user = userRepository.findById(id).orElse(null);
        return userMapper.toDTO(user);
    }

}
