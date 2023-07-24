package com.zemoso.bc24minet.services;

import com.zemoso.bc24minet.dto.PaymentMethodDTO;
import com.zemoso.bc24minet.dto.PaymentMethodType;
import com.zemoso.bc24minet.dto.PurchaseRequestDTO;
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
public class PurchaseService {

    @Autowired
    private AmountConvertorService amountConvertorService;

    @Autowired
    private WalletTransferService walletTransferService;

    @Transactional
    public UserWalletTransaction purchase(@Valid PurchaseRequestDTO request, BigInteger userId) {
        BigDecimal amountUSD =
                amountConvertorService.convertToUSD(request.getCurrencyAmount(), request.getCurrencyId());
        PaymentMethodDTO paymentMethod = request.getPaymentMethod();
        if (paymentMethod.getPaymentType() == PaymentMethodType.WALLET) {
            UserWalletTransaction[] txs = walletTransferService.transfer(request.getPaymentMethod().getWalletId(),
                    request.getCurrencyId(), amountUSD, userId);
            return txs[1];
        } else {
            // Else initiate CARD/Bank payment. But for demo directly add the target transaction
            return walletTransferService.deposit(request.getCurrencyId(), amountUSD, userId, "Self");
        }
    }
}
