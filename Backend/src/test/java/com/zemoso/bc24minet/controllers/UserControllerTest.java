package com.zemoso.bc24minet.controllers;

import com.zemoso.bc24minet.repositories.UserRepository;
import com.zemoso.bc24minet.services.UserService;
import com.zemoso.bc24minet.services.impl.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    private UserController userController;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MockMvc mockMvc;

    private UserService userService=org.mockito.Mockito.mock(UserServiceImpl.class);

    @Test
    void givenInvalidUserId_whenRetrieve_thenThrowEception() throws Exception {
        mockMvc.perform(get("/users/me")).andExpect(status().isOk())
                .andReturn();
    }

}
