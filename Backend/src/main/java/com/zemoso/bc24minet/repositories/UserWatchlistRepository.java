package com.zemoso.bc24minet.repositories;

import com.zemoso.bc24minet.entities.UserWatchlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.Set;
import java.util.stream.Stream;


@Repository
public interface UserWatchlistRepository extends JpaRepository<UserWatchlist, BigInteger> {
    Stream<UserWatchlist> findByUserId(BigInteger userId);

    @Query("select w.currencyId from UserWatchlist w where w.userId=:userId")
    Set<Integer> findCurrencyIdByUserId(BigInteger userId);

    @Query("select w.id from UserWatchlist w where w.currencyId=:id")
    BigInteger findIdByCurrencyId(Integer id);
}
