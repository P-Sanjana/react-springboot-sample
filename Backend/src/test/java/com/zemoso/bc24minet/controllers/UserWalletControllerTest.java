package com.zemoso.bc24minet.controllers;

import com.zemoso.bc24minet.entities.Currency;
import com.zemoso.bc24minet.entities.CurrencyType;
import com.zemoso.bc24minet.entities.UserWallet;
import com.zemoso.bc24minet.repositories.CurrencyRepository;
import com.zemoso.bc24minet.repositories.UserWalletRepository;
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
class UserWalletControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private UserWalletRepository userWalletRepository;

    @Autowired
    private CurrencyRepository currencyRepository;

    @Test
    void givenNoUserWalletEntity_whenRetrieve_thenThrowException() throws Exception {
        clearRepository();
        mockMvc.perform(get("/wallets")).andExpect(status().is4xxClientError())
                .andExpect(result -> Assertions.assertTrue(result.getResolvedException() instanceof ResponseStatusException))
                .andReturn();
        addDataToRepository();
        mockMvc.perform(get("/wallets")).andExpect(status().isOk()).andReturn();

    }

    private void clearRepository(){
        userWalletRepository.deleteAll();
    }

    private void addDataToRepository(){
        Currency currency=Currency.builder().id(1).type(CurrencyType.CRYPTO).name("Bitcoin").code("BTC").logoImageUrl("img").color("green").about("About Bitcoin").build();
        currencyRepository.save(currency);
        userWalletRepository.save(UserWallet.builder().id(BigInteger.valueOf(1)).userId(BigInteger.valueOf(1))
                .currencyId(1).balance(BigDecimal.valueOf(100.0f)).currency(currency).build());
    }

    @Test
     void givenUserWalletEntity_whenRetrieve_thenThrowException() throws Exception {
        addDataToRepository();
        mockMvc.perform(get("/wallets")).andExpect(status().isOk()).andReturn();
    }

    @Test
    void givenInvalidWalletId_whenRetrieve_thenThrowException() throws Exception {
        mockMvc.perform(get("/wallets/10")).andExpect(status().is4xxClientError())
                .andExpect(result->Assertions.assertTrue(result.getResolvedException() instanceof ResponseStatusException))
                .andReturn();
    }

    @Test
    void givenValidWalletId_whenRetrieve_thenWalletIsFound() throws Exception {
        addDataToRepository();
        mockMvc.perform(get("/wallets/1")).andExpect(status().isOk())
                .andReturn();
    }
    @Test
    void givenNegativeOrZeroWalletId_whenRetrieve_thenWalletIsFound() throws Exception {
        addDataToRepository();
        mockMvc.perform(get("/wallets/-1")).andExpect(status().isBadRequest())
                .andReturn();
    }
}