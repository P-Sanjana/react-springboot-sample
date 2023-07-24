package com.zemoso.bc24minet.dto;

import com.zemoso.bc24minet.entities.CurrencyType;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.math.BigDecimal;
import java.math.BigInteger;

@Data
@NoArgsConstructor
public class WalletDTO {

    private BigInteger id;

    private BigInteger userId;

    private Integer currencyId;

    private CurrencyType currencyType;

    private BigDecimal amount;
}
