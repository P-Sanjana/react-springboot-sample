package com.zemoso.bc24minet.services;

import com.zemoso.bc24minet.entities.*;
import com.zemoso.bc24minet.repositories.CurrencyRepository;
import com.zemoso.bc24minet.repositories.UserWalletRepository;
import com.zemoso.bc24minet.repositories.UserWalletTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.validation.ValidationException;
import java.math.BigDecimal;
import java.math.BigInteger;

@Service
public class WalletTransferService {

    @Autowired
    private AmountConvertorService amountConvertorService;

    @Autowired
    private UserWalletRepository walletRepository;

    @Autowired
    private UserWalletTransactionRepository transactionRepository;

    @Autowired
    private CurrencyRepository currencyRepository;

    @Transactional
    public UserWalletTransaction withdraw(BigInteger walletId, BigDecimal amountUSD) {
        UserWallet wallet = walletRepository.findById(walletId)
                .orElseThrow(() -> new ValidationException("Invalid walletId"));
        BigDecimal amount = amountConvertorService.convertFromUSD(amountUSD, wallet.getCurrencyId());
        if (wallet.getBalance().compareTo(amount) < 0) {
            throw new ValidationException("Wallet Balance is not sufficient");
        }
        wallet.setBalance(wallet.getBalance().subtract(amount));
        walletRepository.save(wallet);
        UserWalletTransaction paymentTransaction = UserWalletTransaction.builder()
                .walletId(wallet.getId())
                .userWallet(wallet)
                .currencyAmount(amount)
                .currencyId(wallet.getCurrencyId())
                .amountUsd(amountUSD)
                .status(Status.PROCESSED)
                .type(TransactionType.SELL)
                .participantName("Self")
                .build();
        return transactionRepository.save(paymentTransaction);
    }

    @Transactional
    public UserWalletTransaction deposit(Integer currencyId, BigDecimal amountUSD, BigInteger userId,
                                         String participantName) {
        Currency currency = currencyRepository.findById(currencyId).orElse(null);
        BigDecimal amount = amountConvertorService.convertFromUSD(amountUSD, currencyId);
        // Get the existing wallet or create new one
        UserWallet wallet = walletRepository.findByUserIdAndCurrencyId(userId, currencyId)
                .orElseGet(() -> UserWallet.builder()
                        .userId(userId)
                        .currencyId(currencyId)
                        .balance(BigDecimal.ZERO)
                        .build());
        wallet.setCurrency(currency);
        wallet.setBalance(wallet.getBalance().add(amount));
        walletRepository.save(wallet);
        UserWalletTransaction transaction = UserWalletTransaction.builder()
                .walletId(wallet.getId())
                .userWallet(wallet)
                .currencyAmount(amount)
                .currencyId(wallet.getCurrencyId())
                .amountUsd(amountUSD)
                .status(Status.PROCESSED)
                .type(TransactionType.BUY)
                .participantName(participantName)
                .build();
        return transactionRepository.save(transaction);
    }

    @Transactional
    public UserWalletTransaction[] transfer(BigInteger sourceWalletId, Integer targetCurrencyId, BigDecimal amountUSD,
                                            BigInteger userId) {
        UserWalletTransaction withdrawTx = withdraw(sourceWalletId, amountUSD);
        UserWalletTransaction depositTx = deposit(targetCurrencyId, amountUSD, userId,
                withdrawTx.getUserWallet().getCurrency().getCode());
        return new UserWalletTransaction[]{withdrawTx, depositTx};
    }
}
