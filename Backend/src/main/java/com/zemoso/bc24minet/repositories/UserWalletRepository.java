package com.zemoso.bc24minet.repositories;

import com.zemoso.bc24minet.entities.UserWallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.Optional;

@Repository
public interface UserWalletRepository extends JpaRepository<UserWallet, BigInteger> {

    Optional<UserWallet> findByUserIdAndCurrencyId(BigInteger userId, Integer currencyId);
}
