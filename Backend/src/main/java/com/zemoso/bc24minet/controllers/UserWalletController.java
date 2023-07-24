package com.zemoso.bc24minet.controllers;

import com.zemoso.bc24minet.dto.PaginationDTO;
import com.zemoso.bc24minet.dto.UserWalletTransactionDTO;
import com.zemoso.bc24minet.dto.WalletDTO;
import com.zemoso.bc24minet.entities.UserWalletTransaction;
import com.zemoso.bc24minet.mapper.UserWalletTransactionMapper;
import com.zemoso.bc24minet.services.UserWalletService;
import com.zemoso.bc24minet.services.UserWalletTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.util.CollectionUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.math.BigInteger;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/wallets")
@Validated
public class UserWalletController {
    @Autowired
    private UserWalletService userWalletService;

    @Autowired
    private UserWalletTransactionService userWalletTransactionService;

    @Autowired
    private UserWalletTransactionMapper userWalletTransactionMapper;

    @GetMapping("")
    public List<WalletDTO> getAllWallets() {
        List<WalletDTO> wallets = userWalletService.getWallets();
        if (CollectionUtils.isEmpty(wallets)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "wallets not found");
        }
        return wallets;
    }

    @GetMapping("/{id}")
    public WalletDTO getWalletById(@PathVariable @Min(value = 1, message = "id value must be positive") BigInteger id) {
        WalletDTO walletDto = userWalletService.getWalletById(id);
        if (walletDto == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "wallet with " + id + " not found.");
        }
        return walletDto;
    }

    @GetMapping("/{id}/transactions")
    public PaginationDTO<UserWalletTransactionDTO> getTransactionByWalletId(@PathVariable @Min(value = 1, message = "id value must be positive") BigInteger id, @RequestParam(defaultValue = "1") @NotNull int past, @RequestParam(defaultValue = "10") @Min(value = 1, message = "must not be negative") int pageLength, @RequestParam(defaultValue = "0") @Min(value = 0, message = "must not be negative") int pageOffset) {
        Page<UserWalletTransaction> userWalletTransaction = userWalletTransactionService.getTransactionsByWalletId(id, pageLength, pageOffset);

        if (userWalletTransaction.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Data not found");
        }
        return new PaginationDTO<>(userWalletTransaction.getTotalElements(), userWalletTransaction.stream().map(userWalletTransactionMapper::toUserWalletTransactionDto).collect(Collectors.toList()));
    }

}
