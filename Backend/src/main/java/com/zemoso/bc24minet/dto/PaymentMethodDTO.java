package com.zemoso.bc24minet.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.math.BigInteger;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentMethodDTO {

    @NotNull
    private PaymentMethodType paymentType;

    /**
     * Used When paymentType=CARD
     */
    private String cardNo;

    /**
     * Used When paymentType=WALLET
     */
    private BigInteger walletId;
}
