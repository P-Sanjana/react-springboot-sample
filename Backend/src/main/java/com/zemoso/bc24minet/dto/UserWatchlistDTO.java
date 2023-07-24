package com.zemoso.bc24minet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserWatchlistDTO {
    private BigInteger id;
    private Integer currencyId;
    private boolean watch;
}
