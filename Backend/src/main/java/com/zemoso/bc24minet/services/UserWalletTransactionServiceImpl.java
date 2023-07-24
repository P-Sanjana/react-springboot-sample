package com.zemoso.bc24minet.services;

import com.zemoso.bc24minet.entities.UserWalletTransaction;
import com.zemoso.bc24minet.repositories.UserWalletTransactionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;

import javax.transaction.Transactional;
import java.math.BigInteger;

@Slf4j
@Service
public class UserWalletTransactionServiceImpl implements UserWalletTransactionService {

    @Autowired
    UserWalletTransactionRepository userWalletTransactionRepository;

    @Transactional
    @Override
    public Page<UserWalletTransaction> getTransactions(int pageNumber, int pageOffset) {
        Pageable pageable = PageRequest.of(pageOffset, pageNumber);
        return userWalletTransactionRepository.findAllTransactions(pageable);
    }

    @Override
    public Page<UserWalletTransaction> getTransactionsByWalletId(BigInteger id, int pageLength, int pageOffset) {
        Pageable pageable = PageRequest.of(pageOffset, pageLength);

        return userWalletTransactionRepository.findAllTransactionsByWalletId(id,pageable);
    }
}
