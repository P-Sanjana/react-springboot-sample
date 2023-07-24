package com.zemoso.bc24minet.services;

import com.zemoso.bc24minet.dto.CurrenciesLatestPriceDto;
import com.zemoso.bc24minet.dto.PriceDateTimeDto;

import java.util.List;

public interface CurrencyService {
    List<CurrenciesLatestPriceDto> getAllCurrencies();

    CurrenciesLatestPriceDto getCurrencyDetail(int id);

    List<PriceDateTimeDto> getPrices(int id, int timeInterval);
}
