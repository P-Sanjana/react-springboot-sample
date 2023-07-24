package com.zemoso.bc24minet.mapper;


import com.zemoso.bc24minet.dto.AuditableDto;
import com.zemoso.bc24minet.dto.CurrencyDto;
import com.zemoso.bc24minet.entities.Currency;
import org.mapstruct.Mapper;

import java.util.List;


@Mapper(componentModel = "spring",uses = {AuditableDto.class})
public interface CurrencyMapper {


    CurrencyDto modelToDto(Currency currency);

    Currency dtoToModel(CurrencyDto currencyDto);

    List<Currency> dtoToModelList(List<CurrencyDto> currencies);

    List<CurrencyDto> modelToDtoList(List<Currency> currencyList);
}
