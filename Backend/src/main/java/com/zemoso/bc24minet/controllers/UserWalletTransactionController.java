package com.zemoso.bc24minet.controllers;

import com.zemoso.bc24minet.dto.PaginationDTO;
import com.zemoso.bc24minet.dto.UserWalletTransactionDTO;
import com.zemoso.bc24minet.entities.UserWalletTransaction;
import com.zemoso.bc24minet.mapper.UserWalletTransactionMapper;
import com.zemoso.bc24minet.services.UserWalletTransactionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.constraints.Min;
import java.util.stream.Collectors;


@Slf4j
@RestController
@Validated
@RequestMapping("/")
public class UserWalletTransactionController {

    @Autowired
    UserWalletTransactionService userWalletTransactionService;

    @Autowired
    UserWalletTransactionMapper userWalletTransactionMapper;

    @GetMapping("/transactions")
    public PaginationDTO<UserWalletTransactionDTO> getTransaction(@RequestParam(defaultValue = "10") @Min(value = 1, message = "must not be negative") int pageLength, @RequestParam(defaultValue = "0") @Min(value = 0, message = "must not be negative") int pageOffset) {
        Page<UserWalletTransaction> userWalletTransaction = userWalletTransactionService.getTransactions(pageLength, pageOffset);

        if (userWalletTransaction.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Data not found");
        }
        return new PaginationDTO<>(userWalletTransaction.getTotalElements(), userWalletTransaction.stream().map(userWalletTransactionMapper::toUserWalletTransactionDto).collect(Collectors.toList()));
    }
}
