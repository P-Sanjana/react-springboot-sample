package com.zemoso.bc24minet.services;

import com.zemoso.bc24minet.dto.SellRequestDTO;
import com.zemoso.bc24minet.entities.UserWalletTransaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.math.BigDecimal;
import java.math.BigInteger;

@Service
@Validated
public class SellService {

    @Autowired
    private AmountConvertorService amountConvertorService;

    @Autowired
    private WalletTransferService walletTransferService;

    @Transactional
    public UserWalletTransaction sell(@Valid SellRequestDTO request, BigInteger userId) {
        BigDecimal amountUSD =
                amountConvertorService.convertToUSD(request.getCurrencyAmount(), request.getCurrencyId());
        UserWalletTransaction[] txs = walletTransferService.transfer(request.getWalletId(),
                request.getDepositToCurrencyId(), amountUSD, userId);
        return txs[0];
    }
}
