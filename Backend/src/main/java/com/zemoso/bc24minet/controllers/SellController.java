package com.zemoso.bc24minet.controllers;

import com.zemoso.bc24minet.dto.SellRequestDTO;
import com.zemoso.bc24minet.dto.UserWalletTransactionDTO;
import com.zemoso.bc24minet.entities.UserWalletTransaction;
import com.zemoso.bc24minet.mapper.UserWalletTransactionMapper;
import com.zemoso.bc24minet.repositories.UserWalletTransactionRepository;
import com.zemoso.bc24minet.services.SellService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigInteger;

@RestController
@RequestMapping("/sell")
public class SellController {

    @Autowired
    private SellService sellService;

    @Autowired
    private UserWalletTransactionRepository transactionRepository;

    @Autowired
    private UserWalletTransactionMapper transactionMapper;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public UserWalletTransactionDTO post(@RequestBody SellRequestDTO request) {
        UserWalletTransaction transaction = sellService.sell(request, BigInteger.valueOf(1));

        return transactionMapper.toUserWalletTransactionDto(transaction);
    }


}
