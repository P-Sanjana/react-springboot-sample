package com.zemoso.bc24minet.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;
import java.math.BigInteger;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SellRequestDTO {
    @NotNull
    private BigInteger walletId;

    @NotNull
    private Integer currencyId;

    @NotNull
    @Positive
    private BigDecimal currencyAmount;

    @NotNull
    private PurchaseDeliveryType deliveryType;

    @NotNull
    private Integer depositToCurrencyId;
}
