package com.zemoso.bc24minet.mapper;

import com.zemoso.bc24minet.dto.PortfolioChangeDTO;
import com.zemoso.bc24minet.entities.UserPortfolioHistory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PortfolioHistoryMapper {

    @Mapping(source = "investedAmountInUSD", target = "investedAmount")
    @Mapping(source = "currentAmountInUSD", target = "changedAmount")
    @Mapping(source = "changePercent", target = "changeRate")
    @Mapping(source = "historyDT", target = "datetime")
    PortfolioChangeDTO toDTO(UserPortfolioHistory history);
}
