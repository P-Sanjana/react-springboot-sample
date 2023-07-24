package com.zemoso.bc24minet.mapper;


import com.zemoso.bc24minet.dto.AuditableDto;
import com.zemoso.bc24minet.dto.CurrencyPriceHistDto;

import com.zemoso.bc24minet.entities.CurrencyPriceHistory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring",uses = {CurrencyMapper.class, AuditableDto.class})
public interface CurrencyPriceMapper {


    @Mapping(source = "currency",target ="currencyDto" )
    CurrencyPriceHistDto modelToDto(CurrencyPriceHistory currency);

     @Mapping(source = "currencyDto",target = "currency")
    CurrencyPriceHistory dtoToModel(CurrencyPriceHistDto currencyDto);

    List<CurrencyPriceHistory> dtoToModelList(List<CurrencyPriceHistDto> currencies);

    List<CurrencyPriceHistDto> modelToDtoList(List<CurrencyPriceHistory> currencyList);
}
