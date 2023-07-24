package com.zemoso.bc24minet.services;

import com.zemoso.bc24minet.controllers.UserController;
import com.zemoso.bc24minet.dto.UserDTO;
import com.zemoso.bc24minet.entities.User;
import com.zemoso.bc24minet.mapper.UserMapper;
import com.zemoso.bc24minet.repositories.UserRepository;
import com.zemoso.bc24minet.services.impl.UserServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigInteger;

@SpringBootTest
@AutoConfigureMockMvc
class UserServiceTest {

    @Autowired
    private UserController userController;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MockMvc mockMvc;

    private UserService userService=org.mockito.Mockito.mock(UserServiceImpl.class);

    @Test
    void fetchUsers() {
        BigInteger id=BigInteger.ONE;

        User user=new User(id, "Admin", "Admin", "Admin", "Admin", "Admin");
        userRepository.save(user);

        UserMapper instance= Mappers.getMapper(UserMapper.class);
        UserDTO userDTO= instance.toDTO(user);
        Mockito.when(userService.getUserById(id)).thenReturn(userDTO);
        Assertions.assertNotNull(userDTO);
        Assertions.assertEquals(userDTO,userService.getUserById(id));
    }
}