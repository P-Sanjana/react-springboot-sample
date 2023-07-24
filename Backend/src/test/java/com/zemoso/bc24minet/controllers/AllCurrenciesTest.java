package com.zemoso.bc24minet.controllers;

import com.zemoso.bc24minet.entities.Currency;
import com.zemoso.bc24minet.entities.CurrencyPriceHistory;
import com.zemoso.bc24minet.entities.CurrencyType;
import com.zemoso.bc24minet.repositories.CurrencyPriceRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AllCurrenciesTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CurrencyPriceRepository currencyPriceRepository;

    void mockCurrencyList() {
        CurrencyPriceHistory currencyPriceHistory = new CurrencyPriceHistory();
        Currency currency = new Currency();
        Integer id = 1;
        currency.setId(id);
        currency.setName("bitcoin");
        currency.setType(CurrencyType.CRYPTO);
        currency.setColor("BTC");
        currency.setAbout("addcbdfy hyfh");
        currency.setLogoImageUrl("dddd");
        currency.setCreatedBy("abc");
        currency.setModifiedBy("abc");
        currency.setCreatedDate(LocalDateTime.now());
        currency.setModifiedDate(LocalDateTime.now());
        currency.setCode("BTC");
        currencyPriceHistory.setCurrency(currency);
        currencyPriceHistory.setHistoryDT(LocalDateTime.now());
        currencyPriceHistory.setPrice(BigDecimal.valueOf(12));
        currencyPriceHistory.setCirculatingSupply(BigInteger.ONE);
        currencyPriceHistory.setMarketCap(12.8);
        currencyPriceHistory.setCreatedBy("vvv");
        currencyPriceHistory.setModifiedBy("ddd");
        currencyPriceHistory.setVol(11.5);
        currencyPriceHistory.setCreatedDate(LocalDateTime.now());
        currencyPriceHistory.setModifiedDate(LocalDateTime.now());
        when(currencyPriceRepository.getLatestPricesOfAllCurrencies()).thenReturn(Collections.singletonList(currencyPriceHistory));
        when(currencyPriceRepository.getPrices(anyInt(), anyInt())).thenReturn(Collections.singletonList(currencyPriceHistory));
    }

    @Test
    void getAllCurrencies() throws Exception {
        mockCurrencyList();
        mockMvc.perform(get("/currencies")).andExpect(status().isOk()).andReturn();
    }

    @Test
    void getAllCurrenciesWhenNoDataIsPresent() throws Exception {

        mockMvc.perform(get("/currencies")).andExpect(status().isNotFound());
    }

    @Test
    void whenPricesAvailableForCurr_thenReturnDataOK() throws Exception {
        mockCurrencyList();
        mockMvc.perform(get("/currencies/{id}/prices", 1)
                        .queryParam("past", "3"))
                .andExpect(status().isOk());
    }
}
