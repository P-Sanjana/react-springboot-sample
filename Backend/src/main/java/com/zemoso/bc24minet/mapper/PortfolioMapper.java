package com.zemoso.bc24minet.mapper;

import com.zemoso.bc24minet.dto.PortfolioDTO;
import com.zemoso.bc24minet.entities.UserPortfolioHistory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PortfolioMapper {

    @Mapping(source = "currencyId", target = "currencyId")
    @Mapping(source = "investedAmountInUSD", target = "investedAmount")
    @Mapping(source = "currentAmountInUSD", target = "changedAmount")
    @Mapping(source = "changePercent", target = "changeRate")
    @Mapping(source = "historyDT", target = "datetime")
    PortfolioDTO toDTO(UserPortfolioHistory history);
}
