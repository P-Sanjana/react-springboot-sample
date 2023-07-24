package com.zemoso.bc24minet.services;

import com.zemoso.bc24minet.dto.WalletDTO;
import com.zemoso.bc24minet.entities.UserWallet;
import com.zemoso.bc24minet.mapper.WalletMapper;
import com.zemoso.bc24minet.repositories.UserWalletRepository;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserWalletServiceImpl implements UserWalletService {
    @Autowired
    private UserWalletRepository userWalletRepository;

    WalletMapper instance= Mappers.getMapper(WalletMapper.class);

    @Override
    @Transactional
    public List<WalletDTO> getWallets() {

        return userWalletRepository.findAll().stream().map(instance::walletToDto).collect(Collectors.toList());
    }

    @Override
    public WalletDTO getWalletById(BigInteger id) {
        Optional<UserWallet> userWallet= userWalletRepository.findById(id);
        UserWallet foundUserWallet=null;
        if(userWallet.isPresent()){
            foundUserWallet=userWallet.get();
        }
        return instance.walletToDto(foundUserWallet);
    }
}
