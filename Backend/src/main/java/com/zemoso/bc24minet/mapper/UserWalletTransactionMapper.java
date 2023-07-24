package com.zemoso.bc24minet.mapper;

import com.zemoso.bc24minet.dto.UserWalletTransactionDTO;
import com.zemoso.bc24minet.entities.UserWalletTransaction;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserWalletTransactionMapper {


    @Mapping(source = "userWallet.userId", target = "userId")
    @Mapping(source = "userWallet.currency.name", target = "currencyName")
    @Mapping(source = "userWallet.currency.code", target = "currencyCode")
    @Mapping(source = "modifiedDate", target = "datetime")
    @Mapping(source = "amountUsd", target = "amount")
    UserWalletTransactionDTO toUserWalletTransactionDto(UserWalletTransaction userWalletTransaction);

}