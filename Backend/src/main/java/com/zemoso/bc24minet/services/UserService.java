package com.zemoso.bc24minet.services;

import com.zemoso.bc24minet.dto.UserDTO;

import java.math.BigInteger;

public interface UserService {

    public UserDTO getUserById(BigInteger id);
}
