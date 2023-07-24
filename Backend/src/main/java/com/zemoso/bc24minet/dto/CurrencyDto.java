package com.zemoso.bc24minet.dto;
import com.zemoso.bc24minet.entities.CurrencyType;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;


@Data
public class CurrencyDto extends AuditableDto {

    private Integer id;

    @Enumerated(EnumType.STRING)
    @NotNull
    private CurrencyType type;

    @NotNull
    private String name;


    @NotNull
    private String code;

    @NotNull
    private String logoImageUrl;
    @NotNull
    @NotBlank
    private String about;
    private List<CurrencyPriceHistDto> currencyPriceHistDtos;
    private String color;

}
