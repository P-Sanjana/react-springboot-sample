package com.zemoso.bc24minet.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zemoso.bc24minet.dto.PortfolioChangeDTO;
import com.zemoso.bc24minet.entities.Currency;
import com.zemoso.bc24minet.entities.CurrencyType;
import com.zemoso.bc24minet.entities.UserPortfolioHistory;
import com.zemoso.bc24minet.repositories.CurrencyRepository;
import com.zemoso.bc24minet.repositories.UserPortfolioHistoryRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("itest")
class PortfolioControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserPortfolioHistoryRepository historyRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private CurrencyRepository currencyRepository;

    @Test
    void whenValidRequest_thenRespondOnlyBoundedItems() throws Exception {
        Currency currency = currencyRepository.save(Currency.builder().name("Bitcoin4").code("ELON")
                .color("EE").logoImageUrl("ee").type(CurrencyType.CRYPTO).about("Bitcoin").build());
        final var currencyId = currency.getId();
        // Add withing 5 minutes
        historyRepository.save(UserPortfolioHistory.builder()
                .userId(BigInteger.ONE)
                .currencyId(currencyId)
                .currentAmountInUSD(15000f)
                .investedAmountInUSD(10000f)
                .changePercent(50f)
                .historyDT(LocalDateTime.now().minusMinutes(5))
                .build());
        // Add history item more than 30 minutes.
        historyRepository.save(UserPortfolioHistory.builder()
                .userId(BigInteger.ONE)
                .currencyId(currencyId)
                .currentAmountInUSD(15000f)
                .investedAmountInUSD(10000f)
                .changePercent(50f)
                .historyDT(LocalDateTime.now().minusMinutes(30))
                .build());
        // Fetch for past 10 minutes
        MvcResult mockResult = mockMvc.perform(get("/portfolio/{currencyId}/changes", currencyId)
                        .queryParam("past", "10"))
                .andExpect(status().isOk())
                .andReturn();
        List<PortfolioChangeDTO> result = objectMapper.readValue(mockResult.getResponse().getContentAsString(),
                objectMapper.getTypeFactory().constructCollectionType(List.class, PortfolioChangeDTO.class));
        assertEquals(1, result.size());
        // Assert it includes only bounded items
        assertEquals(50f, result.get(0).getChangeRate());
    }

    @Test
    void whenInvalidCurrencyIdRequest_thenNotFound() throws Exception {
        final var currencyId = 1000;
        mockMvc.perform(get("/portfolio/{currencyId}/changes", currencyId)
                        .queryParam("past", "10"))
                .andExpect(status().isNotFound());
    }

    @Test
    void whenInvalidPastParam_thenBadRequest() throws Exception {
        final var currencyId = 1;
        mockMvc.perform(get("/portfolio/{currencyId}/changes", currencyId)
                        .queryParam("past", "-25"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void fetchPortfolio() throws Exception{
        Currency currency = currencyRepository.save(Currency.builder().name("Ethereum1").code("ELON1")
                .color("EE").logoImageUrl("ee").type(CurrencyType.CRYPTO).about("Bitcoin").build());
        final var currencyId = currency.getId();
        historyRepository.save(UserPortfolioHistory.builder()
                .userId(BigInteger.ONE)
                .currencyId(currencyId)
                .currentAmountInUSD(15000f)
                .investedAmountInUSD(10000f)
                .changePercent(50f)
                .historyDT(LocalDateTime.now().minusMinutes(5))
                .build());

        mockMvc.perform(get("/portfolio")).andExpect(status().isOk());

    }

    @Test
    void fetchPortfolioWithCurrencyId() throws Exception{
        Currency currency = currencyRepository.save(Currency.builder().name("Bitcoin5").code("ELON5")
                .color("EE").logoImageUrl("ee").type(CurrencyType.CRYPTO).about("Bitcoin").build());
        final var currencyId = currency.getId();
        historyRepository.save(UserPortfolioHistory.builder()
                .userId(BigInteger.ONE)
                .currencyId(currencyId)
                .currentAmountInUSD(15000f)
                .investedAmountInUSD(10000f)
                .changePercent(50f)
                .historyDT(LocalDateTime.now().minusMinutes(5))
                .build());
        mockMvc.perform(get("/portfolio/{currencyId}", currencyId))
                .andExpect(status().isOk());

    }

    @Test
    void fetchPortfolioWithCurrencyId_notFound() throws Exception{

        mockMvc.perform(get("/portfolio/{currencyId}", 1000))
                .andExpect(status().isNotFound());

    }
}