package com.zemoso.bc24minet.controllers;

import com.zemoso.bc24minet.cronjobs.CurrencyApi;
import com.zemoso.bc24minet.dto.CurrenciesLatestPriceDto;
import com.zemoso.bc24minet.dto.PriceDateTimeDto;
import com.zemoso.bc24minet.exceptions.DataNotFoundException;
import com.zemoso.bc24minet.repositories.CurrencyRepository;
import com.zemoso.bc24minet.services.CurrencyService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.constraints.Min;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/currencies")
public class CurrencyController {

    @Autowired
    CurrencyApi currencyApi;

    @Autowired
    CurrencyRepository currencyRepository;

    @Autowired
    private CurrencyService currencyService;

    @GetMapping("")
    public List<CurrenciesLatestPriceDto> getAllCurrencies() {
        var currencies = currencyService.getAllCurrencies();
        if (CollectionUtils.isEmpty(currencies)) {

            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Data not found ");
        }


        return currencies;
    }

    @GetMapping("/{id}")
    public CurrenciesLatestPriceDto getCurrencyDetail(@PathVariable int id) {
        var result = currencyService.getCurrencyDetail(id);
        if (result == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Data not found or invalid id");
        }
        return result;
    }

    @GetMapping("/{id}/prices")
    public List<PriceDateTimeDto> getPrices(@PathVariable int id, @Min(value = 0, message = "past must be positive")
    @RequestParam("past") Integer past) {
        var result = currencyService.getPrices(id, past);
        if (CollectionUtils.isEmpty(result)) {
            throw new DataNotFoundException("data not found");
        }
        return result;
    }


}
