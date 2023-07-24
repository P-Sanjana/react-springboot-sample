package com.zemoso.bc24minet.services;


import com.zemoso.bc24minet.entities.Status;
import com.zemoso.bc24minet.entities.TransactionType;
import com.zemoso.bc24minet.entities.UserWalletTransaction;
import com.zemoso.bc24minet.repositories.UserWalletTransactionRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.math.BigInteger;


@SpringBootTest
@AutoConfigureMockMvc
@Slf4j
@ActiveProfiles("itest")
class UserWalletTransactionServiceTests {


    @Mock
    private UserWalletTransactionRepository userWalletTransactionRepository;

    @Autowired
    private UserWalletTransactionService userWalletTransactionService;


    @Test
    void givenUserWalletTransactionEntity_whenSaveAndRetrieve_thenMatch() {

        Page<UserWalletTransaction> tempList = Page.empty();
        userWalletTransactionRepository.save(UserWalletTransaction.builder().id(BigInteger.valueOf(1)).type(TransactionType.BUY).amountUsd(BigDecimal.valueOf(10)).participantName(String.valueOf("user")).currencyId(1).currencyAmount(BigDecimal.valueOf(100)).status(Status.PROCESSED).build());
        Page<UserWalletTransaction> transactionList = userWalletTransactionService.getTransactions(1, 0);
        Mockito.when(userWalletTransactionService.getTransactions(1, 0)).thenReturn(tempList);
        Assertions.assertEquals(transactionList.getTotalElements(), tempList.getTotalElements());
    }

}






