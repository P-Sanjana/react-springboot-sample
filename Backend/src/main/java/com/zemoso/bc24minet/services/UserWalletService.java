package com.zemoso.bc24minet.services;

import com.zemoso.bc24minet.dto.WalletDTO;

import java.math.BigInteger;
import java.util.List;

public interface UserWalletService {
    public List<WalletDTO> getWallets();

    public WalletDTO getWalletById(BigInteger id);
}