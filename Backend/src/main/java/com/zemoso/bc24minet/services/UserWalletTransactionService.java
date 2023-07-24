package com.zemoso.bc24minet.services;

import com.zemoso.bc24minet.entities.UserWalletTransaction;
import org.springframework.data.domain.Page;

import java.math.BigInteger;

public interface UserWalletTransactionService {
    Page<UserWalletTransaction> getTransactions(int pageNumber, int pageOffset);

    Page<UserWalletTransaction> getTransactionsByWalletId(BigInteger id, int pageLength, int pageOffset);
}
