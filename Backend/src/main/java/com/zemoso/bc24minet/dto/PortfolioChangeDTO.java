package com.zemoso.bc24minet.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PortfolioChangeDTO {

    private Double investedAmount;

    private Double changedAmount;

    private Float changeRate;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'")
    private LocalDateTime datetime;
}
