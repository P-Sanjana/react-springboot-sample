package com.zemoso.bc24minet.controllers;

import com.zemoso.bc24minet.entities.Currency;
import com.zemoso.bc24minet.entities.CurrencyPriceHistory;
import com.zemoso.bc24minet.entities.CurrencyType;
import com.zemoso.bc24minet.repositories.CurrencyPriceRepository;
import com.zemoso.bc24minet.repositories.CurrencyRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDateTime;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("itest")
class CurrencyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CurrencyRepository currencyRepository;

    @Autowired
    private CurrencyPriceRepository currencyPriceRepository;

    private static Currency currency;

    private static CurrencyPriceHistory currencyPriceHistory;

    @BeforeAll
    static void setUpAll() {
        currency = new Currency();
        currency.setName("bitcoin544");
        currency.setType(CurrencyType.CRYPTO);
        currency.setColor("BTC");
        currency.setAbout("addcbdfy hyfh");
        currency.setLogoImageUrl("dddd");
        currency.setCreatedBy("abc");
        currency.setModifiedBy("abc");
        currency.setCreatedDate(LocalDateTime.now());
        currency.setModifiedDate(LocalDateTime.now());
        currency.setCode("BTC33342");
        currencyPriceHistory = new CurrencyPriceHistory();
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
    }

    public void addDataToRepo() {
        currencyRepository.save(currency);
        currencyPriceRepository.save(currencyPriceHistory);
    }

    @Test
    void whenInvalidCurrencyIdRequest_thenNotFound() throws Exception {
        final var id = 1000;
        mockMvc.perform(get("/currencies/{id}/prices", id)
                        .queryParam("past", "1"))
                .andExpect(status().isNotFound());
    }

    @Test
    void invalidParamRequestInPrice() throws Exception {
        final var id = 1;
        mockMvc.perform(get("/currencies/{id}/prices", id)
                        .queryParam("past", "10"))
                .andExpect(status().isNotFound());
    }

    @Test
    void getCurrencyDetail() throws Exception {
        addDataToRepo();
        mockMvc.perform(get("/currencies/1")).andExpect(status().isOk()).andReturn();
    }

    @Test
    void getPrices() throws Exception {
        mockMvc.perform(get("/currencies/1?past=1")).andExpect(status().isOk()).andReturn();
    }

    @Test
    void whenInvalidCurrencyIdRequest_thenNotFoundInDetail() throws Exception {
        final var id = 1000;
        mockMvc.perform(get("/currencies/{id}", id).queryParam("past", "1"))
                .andExpect(status().isNotFound());
    }
}