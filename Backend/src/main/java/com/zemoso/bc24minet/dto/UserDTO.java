package com.zemoso.bc24minet.dto;

import lombok.Data;

import java.math.BigInteger;

@Data
public class UserDTO {
    private BigInteger userId;
    private String firstName;
    private String lastName;
    private String emailId;
    private String contactNum;
    private String avatarImage;
}
