package com.zemoso.bc24minet.repositories;

import com.zemoso.bc24minet.entities.UserWalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;


import java.math.BigInteger;


@EnableJpaRepositories
public interface UserWalletTransactionRepository extends JpaRepository<UserWalletTransaction, BigInteger> {

    @Query("from UserWalletTransaction as t order by t.modifiedDate desc")
    Page<UserWalletTransaction> findAllTransactions(Pageable p);

    @Query("from UserWalletTransaction as t where t.walletId=:id order by t.modifiedDate desc")
    Page<UserWalletTransaction> findAllTransactionsByWalletId(@Param("id") BigInteger id, Pageable pageable);
}
