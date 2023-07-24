package com.zemoso.bc24minet.services;

import com.zemoso.bc24minet.dto.CurrenciesLatestPriceDto;
import com.zemoso.bc24minet.dto.CurrencyPriceHistDto;
import com.zemoso.bc24minet.dto.PriceDateTimeDto;
import com.zemoso.bc24minet.entities.CurrencyPriceHistory;
import com.zemoso.bc24minet.mapper.CurrencyMapper;
import com.zemoso.bc24minet.mapper.CurrencyPriceMapper;
import com.zemoso.bc24minet.repositories.CurrencyPriceRepository;
import com.zemoso.bc24minet.repositories.CurrencyRepository;
import com.zemoso.bc24minet.repositories.UserWatchlistRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@Service
@Slf4j
public class CurrencyServiceImpl implements CurrencyService {

    @Autowired
    private CurrencyRepository currencyRepository;

    @Autowired
    private CurrencyMapper currencyMapper;

    @Autowired
    private CurrencyPriceMapper currencyPriceMapper;

    @Autowired
    private CurrencyPriceRepository currencyPriceRepository;

    @Autowired
    private UserWatchlistRepository userWatchlistRepository;

    @Override
    public List<CurrenciesLatestPriceDto> getAllCurrencies() {
        var curr = currencyPriceRepository.getLatestPricesOfAllCurrencies();
        if (CollectionUtils.isEmpty(curr)) {
            return Collections.emptyList();
        }
        var latestPriceOfCurrencies = currencyPriceMapper.modelToDtoList(curr);
        return currenciesResponseConversion(latestPriceOfCurrencies);
    }

    @Override

    public CurrenciesLatestPriceDto getCurrencyDetail(int id) {

        var currencyDetail = currencyPriceRepository.getCurrencyDetail(id);
        if (currencyDetail == null) {
            return null;
        }
        return setCurrenciesLatestPriceDto(currencyPriceMapper.modelToDto(currencyDetail));
    }


    private List<PriceDateTimeDto> converIntoPriceDateTimeDto(List<CurrencyPriceHistory> currencyPriceHistoryList) {
        List<PriceDateTimeDto> priceDateTimeDtoList = new ArrayList<>();
        for (var c : currencyPriceHistoryList) {
            PriceDateTimeDto priceDateTimeDto = new PriceDateTimeDto();
            priceDateTimeDto.setDateTime(c.getHistoryDT());
            priceDateTimeDto.setPrice(c.getPrice());
            priceDateTimeDtoList.add(priceDateTimeDto);
        }
        return priceDateTimeDtoList;
    }

    @Override
    public List<PriceDateTimeDto> getPrices(int id, int timeInterval) {
        List<CurrencyPriceHistory> currencyPriceHistoryList = null;

        if (timeInterval == 0) {
            return Collections.emptyList();
        } else if (timeInterval == 1) {
            currencyPriceHistoryList = currencyPriceRepository.getLastOneHourData(id);
        } else if (timeInterval == 2) {
            currencyPriceHistoryList = currencyPriceRepository.getPrices(id, 1);
        } else if (timeInterval == 3) {
            currencyPriceHistoryList = currencyPriceRepository.getPrices(id, 7);

        } else if (timeInterval == 4) {
            currencyPriceHistoryList = currencyPriceRepository.getPrices(id, 30);
        } else if (timeInterval == 5) {
            currencyPriceHistoryList = currencyPriceRepository.getPrices(id, 365);
        } else if (timeInterval == 6) {
            currencyPriceHistoryList = currencyPriceRepository.findAll();
        }
        if (currencyPriceHistoryList == null) {
            return Collections.emptyList();
        }
        return this.converIntoPriceDateTimeDto(currencyPriceHistoryList);
    }


    private List<CurrenciesLatestPriceDto> currenciesResponseConversion(List<CurrencyPriceHistDto> currencyPriceHistDtos) {
        List<CurrenciesLatestPriceDto> currenciesLatestPriceDtos = new ArrayList<>();
        var dt = LocalDateTime.now().minusDays(1);
        Set<Integer> watchlist = userWatchlistRepository.findCurrencyIdByUserId(BigInteger.ONE);
        for (var d : currencyPriceHistDtos) {
            var currency = setCurrenciesLatestPriceDto(d);
            currency.setWatch(watchlist.contains(currency.getId()));
            var price = currency.getPrice();
            var prevPrice = currencyPriceRepository.getPriceByDT(currency.getId(), dt);
            prevPrice = prevPrice != null ? prevPrice : price;
            var changeRate =
                    price.subtract(prevPrice).divide(prevPrice, 2, RoundingMode.CEILING).multiply(BigDecimal.valueOf(100));
            currency.setChangeRate(changeRate);
            currenciesLatestPriceDtos.add(currency);

        }
        return currenciesLatestPriceDtos;
    }

    private CurrenciesLatestPriceDto setCurrenciesLatestPriceDto(CurrencyPriceHistDto currencyPriceHistDto) {
        var currency = new CurrenciesLatestPriceDto();
        currency.setId(currencyPriceHistDto.getCurrencyDto().getId());
        currency.setCode(currencyPriceHistDto.getCurrencyDto().getCode());
        currency.setColor(currencyPriceHistDto.getCurrencyDto().getColor());
        currency.setCurrencyType(currencyPriceHistDto.getCurrencyDto().getType());
        currency.setName(currencyPriceHistDto.getCurrencyDto().getName());
        currency.setAbout(currencyPriceHistDto.getCurrencyDto().getAbout());
        currency.setCirculatingSupply(currencyPriceHistDto.getCirculatingSupply());
        currency.setLogoUrl(currencyPriceHistDto.getCurrencyDto().getLogoImageUrl());
        currency.setMarketCap(currencyPriceHistDto.getMarketCap());
        currency.setPrice(currencyPriceHistDto.getPrice());
        currency.setVol24h(currencyPriceHistDto.getVol());
        return currency;
    }
}