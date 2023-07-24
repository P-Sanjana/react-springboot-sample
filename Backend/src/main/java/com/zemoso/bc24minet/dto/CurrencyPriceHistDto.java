package com.zemoso.bc24minet.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDateTime;

@Data
public class CurrencyPriceHistDto extends AuditableDto {

    private Integer id;

    private BigDecimal price;

    private Double marketCap;

    private Double vol;

    private LocalDateTime historyDT;

    private BigInteger circulatingSupply;

    private CurrencyDto currencyDto;
}
