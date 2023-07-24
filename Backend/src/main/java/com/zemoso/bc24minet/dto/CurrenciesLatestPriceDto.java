package com.zemoso.bc24minet.dto;

import com.zemoso.bc24minet.entities.CurrencyType;
import lombok.Data;

import java.math.BigDecimal;
import java.math.BigInteger;

@Data
public class CurrenciesLatestPriceDto {

    private Integer id;
    private CurrencyType currencyType;
    private String name;
    private String code;
    private String logoUrl;
    private String color;
    private BigDecimal price;
    private Double marketCap;
    private Double vol24h;
    private BigInteger circulatingSupply;
    private String about;
    private BigDecimal changeRate;
    private boolean watch;
}
