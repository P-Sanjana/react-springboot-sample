package com.zemoso.bc24minet.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PortfolioDTO {
    private Integer currencyId;
    private Double investedAmount;
    private Double changedAmount;
    private Float changeRate;
    private LocalDateTime datetime;
}
