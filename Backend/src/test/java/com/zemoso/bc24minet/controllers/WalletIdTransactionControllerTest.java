package com.zemoso.bc24minet.controllers;

import com.zemoso.bc24minet.entities.*;
import com.zemoso.bc24minet.repositories.CurrencyRepository;
import com.zemoso.bc24minet.repositories.UserWalletRepository;
import com.zemoso.bc24minet.repositories.UserWalletTransactionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.math.BigInteger;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class WalletIdTransactionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CurrencyRepository currencyRepository;

    @Autowired
    private UserWalletRepository userWalletRepository;

    @Autowired
    private UserWalletTransactionRepository userWalletTransactionRepository;

    @Test
    void givenNoUserWalletransactionEntity_whenRetrieve_thenThrowException() throws Exception {
        mockMvc.perform(get("/wallets/1/transactions")).andExpect(status().is4xxClientError())
                .andExpect(result -> Assertions.assertTrue(result.getResolvedException() instanceof ResponseStatusException))
                .andReturn();
    }

    @Test
    void givenNoUserWalletTransactionEntity_whenRetrieve_thenThrowException() throws Exception {
        Currency currency = Currency.builder().id(1).type(CurrencyType.CRYPTO).name("Bitcoin").code("BTC").logoImageUrl("img").color("green").about("About Bitcoin").build();
        currencyRepository.save(currency);
        UserWallet wallet = userWalletRepository.save(UserWallet.builder().userId(BigInteger.valueOf(1))
                .currencyId(1).balance(BigDecimal.valueOf(100.0f)).currency(currency).build());
        userWalletTransactionRepository.save(UserWalletTransaction.builder().walletId(wallet.getId()).type(TransactionType.BUY).amountUsd(BigDecimal.valueOf(10)).participantName(String.valueOf("admin_user")).currencyId(Integer.valueOf(1)).currencyAmount(BigDecimal.valueOf(100)).status(Status.PROCESSED).userWallet(wallet).build());

        mockMvc.perform(get("/wallets/"+wallet.getId()+"/transactions")).andExpect(status().isOk()).andReturn();
    }



}