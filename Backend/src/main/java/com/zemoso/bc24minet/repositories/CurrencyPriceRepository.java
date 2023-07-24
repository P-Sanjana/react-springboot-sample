package com.zemoso.bc24minet.repositories;

import com.zemoso.bc24minet.entities.CurrencyPriceHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;


public interface CurrencyPriceRepository extends JpaRepository<CurrencyPriceHistory, Integer> {

    @Query(value = "select * from currencies as c left join currency_price_history as p on p.currency_id=c.id  and p.id=(select  id from currency_price_history where currency_id=c.id order by history_dt  desc limit 1);", nativeQuery = true)
    List<CurrencyPriceHistory> getLatestPricesOfAllCurrencies();

    @Query(value = "SELECT  * FROM currency_price_history as c where c.currency_id=:id ORDER BY c.history_dt DESC LIMIT 1", nativeQuery = true)
    CurrencyPriceHistory getCurrencyDetail(@Param("id") int id);


    @Query(value = "select p.price_usd from currency_price_history p where p.currency_id=:currencyId order by " +
            "history_dt " +
            "desc limit 1", nativeQuery = true)
    BigDecimal getLatestPrice(Integer currencyId);


    @Query(value = "select * from currency_price_history as p  where p.currency_id=:id and history_dt>now()-interval :intervalInDays day", nativeQuery = true)
    List<CurrencyPriceHistory> getPrices(@Param("id") int id, int intervalInDays);


    @Query(value = "select * from currency_price_history as p  where p.currency_id=:id and history_dt>now()-interval " +
            "1 hour ", nativeQuery = true)
    List<CurrencyPriceHistory> getLastOneHourData(@Param("id") int id);

    @Query(value = "select p.price_usd from currency_price_history p where p.currency_id=:currencyId  and p" +
            ".history_dt<:dt order by history_dt " +
            "desc limit 1", nativeQuery = true)
    BigDecimal getPriceByDT(Integer currencyId, LocalDateTime dt);
}
