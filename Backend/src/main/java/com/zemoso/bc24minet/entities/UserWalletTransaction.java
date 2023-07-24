package com.zemoso.bc24minet.entities;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.math.BigInteger;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@ToString
@Table(name = "users_wallet_transactions")
public class UserWalletTransaction extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private BigInteger id;

    @Column(name = "wallet_id")
    @NotNull
    private BigInteger walletId;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    @NotNull
    private TransactionType type;

    @Column(name = "amount_usd")
    @NotNull
    private BigDecimal amountUsd;

    @Column(name = "participant_name")
    @NotNull
    private String participantName;

    @Column(name = "currency_id")
    @NotNull
    private Integer currencyId;

    @Column(name = "currency_amount")
    @NotNull
    private BigDecimal currencyAmount;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    @NotNull
    private Status status;

    @ManyToOne
    @JoinColumn(name = "wallet_id", referencedColumnName = "id", insertable = false, updatable = false)
    private UserWallet userWallet;

}
