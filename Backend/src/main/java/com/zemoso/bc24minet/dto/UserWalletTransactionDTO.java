package com.zemoso.bc24minet.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.zemoso.bc24minet.entities.Status;
import com.zemoso.bc24minet.entities.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserWalletTransactionDTO {

    private BigInteger id;

    private Integer userId;

    private BigInteger walletId;

    private Integer currencyId;

    private String currencyName;

    private String currencyCode;

    private TransactionType type;

    private Status status;

    private BigDecimal currencyAmount;

    private BigDecimal amount;

    private String participantName;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'")
    private LocalDateTime datetime;
}
