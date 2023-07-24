package com.zemoso.bc24minet.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigInteger;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User extends Auditable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private BigInteger userId;

    @NotBlank(message = "required")
    @Size(min=2,max=15,message = "length must be between 2 and 15")
    @Column(name = "first_name")
    @NotNull
    private String firstName;

    @NotBlank(message = "required")
    @Size(min=2,max=15,message = "length must be between 2 and 15")
    @Column(name = "last_name")
    @NotNull
    private String lastName;

    @NotBlank(message = "required")
    @Size(min=2,max=15,message = "length must be between 2 and 15")
    @Column(name = "email_id")
    @NotNull
    private String emailId;

    @NotBlank(message = "required")
    @Size(min=2,max=15,message = "length must be between 9 and 11")
    @Column(name = "contact_num")
    @NotNull
    private String contactNum;

    @NotBlank(message = "required")
    @Column(name = "avatar_img_url")
    @NotNull
    private String avatarImage;

}
