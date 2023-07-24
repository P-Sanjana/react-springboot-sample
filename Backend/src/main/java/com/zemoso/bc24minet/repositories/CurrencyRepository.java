package com.zemoso.bc24minet.repositories;

import com.zemoso.bc24minet.entities.Currency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@EnableJpaRepositories
@Repository
public interface CurrencyRepository extends JpaRepository<Currency, Integer> {

    @Query(value = "select c from Currency c where c.code=:code")
    Currency getCurrencyByCode(@Param("code") String code);

}
