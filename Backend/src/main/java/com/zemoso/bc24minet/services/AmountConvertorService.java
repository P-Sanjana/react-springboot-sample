package com.zemoso.bc24minet.services;

import com.zemoso.bc24minet.repositories.CurrencyPriceRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Slf4j
@Service
public class AmountConvertorService {

    @Autowired
    private CurrencyPriceRepository priceRepository;

    public BigDecimal convertToUSD(BigDecimal amount, Integer fromCurrencyId) {
        BigDecimal fromCurrUSD = priceRepository.getLatestPrice(fromCurrencyId);
        return fromCurrUSD.multiply(amount);
    }

    public BigDecimal convertFromUSD(BigDecimal amountUSD, Integer toCurrencyId) {
        BigDecimal toCurrUSD = priceRepository.getLatestPrice(toCurrencyId); //0.013354945
        return amountUSD.divide(toCurrUSD, 10, RoundingMode.CEILING);
    }
}
