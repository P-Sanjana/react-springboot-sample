package com.zemoso.bc24minet.entities;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.math.BigInteger;

@Entity
@Table(name="users_wallet")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserWallet extends Auditable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private BigInteger id;

    @Column(name="user_id")
    @NotNull
    private BigInteger userId;

    @Column(name="currency_id")
    @NotNull
    private Integer currencyId;

    @NotNull
    private BigDecimal balance;

    @ManyToOne
    @JoinColumn(name="currency_id",referencedColumnName = "id",insertable = false,updatable = false)
    private Currency currency;

}
