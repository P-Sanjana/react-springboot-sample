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
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.math.BigInteger;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("itest")
class UserWalletTransactionControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CurrencyRepository currencyRepository;

    @Autowired
    private UserWalletRepository userWalletRepository;

    @Autowired
    private UserWalletTransactionRepository userWalletTransactionRepository;


    @Test
    void givenNoUserWalletTransactionEntity_whenRetrieve_thenThrowException() throws Exception {
        userWalletTransactionRepository.deleteAll();
        mockMvc.perform(get("/transactions")).andExpect(status().is4xxClientError())
                .andExpect(result -> Assertions.assertTrue(result.getResolvedException() instanceof ResponseStatusException))
                .andReturn();
    }

    @Test
    void givenUserWalletTransactionEntity_whenRetrieve_thenThrowException() throws Exception {
        Currency currency =
                Currency.builder().id(1).type(CurrencyType.CASH).name("Bitcoin").code("BTC").logoImageUrl("img").color("green").about("About Bitcoin").build();
        currencyRepository.save(currency);

        userWalletRepository.save(UserWallet.builder().id(BigInteger.valueOf(1)).userId(BigInteger.valueOf(1))
                .currencyId(1).balance(BigDecimal.valueOf(100)).currency(currency).build());

        userWalletTransactionRepository.save(UserWalletTransaction.builder().id(BigInteger.ONE).walletId(BigInteger.ONE).type(TransactionType.BUY).amountUsd(BigDecimal.valueOf(10)).participantName("admin_user").currencyId(1).currencyAmount(BigDecimal.valueOf(100)).status(Status.PROCESSED).userWallet(userWalletRepository.getById(BigInteger.ONE)).build());

        String res =
                mockMvc.perform(get("/transactions")).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
        System.out.println("res = " + res);
    }
}