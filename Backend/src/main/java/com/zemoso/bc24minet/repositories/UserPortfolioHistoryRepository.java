package com.zemoso.bc24minet.repositories;

import com.zemoso.bc24minet.entities.UserPortfolioHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.stream.Stream;

public interface UserPortfolioHistoryRepository extends JpaRepository<UserPortfolioHistory, BigInteger> {

    @Query("select h from UserPortfolioHistory h" +
            " where h.userId=:userId and h.currencyId=:currencyId and h.historyDT >= :fromDT" +
            " order by h.historyDT asc")
    Stream<UserPortfolioHistory> findByUserNCurrency(BigInteger userId, Integer currencyId, LocalDateTime fromDT);

    @Query("select u from UserPortfolioHistory u where historyDT in (select max(u1.historyDT) from " +
            "UserPortfolioHistory u1 group by u1.currencyId)")
    Stream<UserPortfolioHistory> fetchPortfolio(BigInteger userId);

    @Query("select u from UserPortfolioHistory u" +
            " where u.userId=:userId and u.currencyId=:currencyId")
    Stream<UserPortfolioHistory> fetchPortfolioWithCurrencyId(BigInteger userId, Integer currencyId);
}
