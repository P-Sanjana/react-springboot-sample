package com.zemoso.bc24minet.mapper;

import com.zemoso.bc24minet.dto.WalletDTO;
import com.zemoso.bc24minet.entities.UserWallet;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface WalletMapper {

            @Mapping(source = "userWallet.id", target = "id")
            @Mapping(source = "userWallet.userId", target = "userId")
            @Mapping(source = "userWallet.currencyId", target = "currencyId")
            @Mapping(source = "userWallet.balance", target = "amount")
            @Mapping(source = "userWallet.currency.type", target = "currencyType")
            WalletDTO walletToDto(UserWallet userWallet);
}
