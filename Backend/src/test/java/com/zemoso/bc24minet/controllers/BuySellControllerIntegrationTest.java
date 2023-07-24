package com.zemoso.bc24minet.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zemoso.bc24minet.dto.*;
import com.zemoso.bc24minet.entities.Currency;
import com.zemoso.bc24minet.entities.CurrencyPriceHistory;
import com.zemoso.bc24minet.entities.CurrencyType;
import com.zemoso.bc24minet.entities.UserWallet;
import com.zemoso.bc24minet.repositories.CurrencyPriceRepository;
import com.zemoso.bc24minet.repositories.CurrencyRepository;
import com.zemoso.bc24minet.repositories.UserWalletRepository;
import com.zemoso.bc24minet.repositories.UserWalletTransactionRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("itest")
class BuySellControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserWalletRepository walletRepository;

    @Autowired
    private UserWalletTransactionRepository transactionRepository;

    @Autowired
    private CurrencyPriceRepository priceRepository;

    @Autowired
    private CurrencyRepository currencyRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private String asJsonString(final Object obj) {
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void whenBuyFromWalletWithBalance_thenTransfer() throws Exception {
        Currency btcCurrency = currencyRepository.save(Currency.builder().name("Doge").code("DGE")
                .color("EE").logoImageUrl("ee").type(CurrencyType.CRYPTO).about("Bitcoin").build());
        priceRepository.save(CurrencyPriceHistory.builder().currency(btcCurrency).price(BigDecimal.valueOf(61661.785))
                .circulatingSupply(BigInteger.valueOf(10000)).marketCap(399849384.0).vol(1323233.0).historyDT(LocalDateTime.now())
                .build());
        Currency ethCurrency = currencyRepository.save(Currency.builder().name("Ethereum57").code("ETH89")
                .color("EE").logoImageUrl("ee").type(CurrencyType.CRYPTO).about("Ethereum").build());
        priceRepository.save(CurrencyPriceHistory.builder().currency(ethCurrency).price(BigDecimal.valueOf(4333.01))
                .circulatingSupply(BigInteger.valueOf(10000)).marketCap(399849384.0).vol(1323233.0).historyDT(LocalDateTime.now())
                .build());

        PurchaseRequestDTO btcReq = PurchaseRequestDTO.builder()
                .currencyId(btcCurrency.getId())
                .currencyAmount(BigDecimal.valueOf(0.5))
                .deliveryType(PurchaseDeliveryType.FASTER)
                .paymentMethod(PaymentMethodDTO.builder().paymentType(PaymentMethodType.CARD).cardNo("12344").build())
                .build();
        String btcResStr = mockMvc.perform(
                        post("/buy").contentType(MediaType.APPLICATION_JSON).content(asJsonString(btcReq))
                )
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        UserWalletTransactionDTO btcRes = objectMapper.readValue(btcResStr, UserWalletTransactionDTO.class);
        assertEquals(BigDecimal.valueOf(0.5), btcRes.getCurrencyAmount().stripTrailingZeros());

        PurchaseRequestDTO ethReq = PurchaseRequestDTO.builder()
                .currencyId(ethCurrency.getId())
                .currencyAmount(BigDecimal.valueOf(1))
                .deliveryType(PurchaseDeliveryType.FASTER)
                .paymentMethod(PaymentMethodDTO.builder().paymentType(PaymentMethodType.WALLET)
                        .walletId(btcRes.getWalletId()).build())
                .build();
        String ethResStr = mockMvc.perform(
                        post("/buy").contentType(MediaType.APPLICATION_JSON).content(asJsonString(ethReq))
                )
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        UserWalletTransactionDTO ethRes = objectMapper.readValue(ethResStr, UserWalletTransactionDTO.class);
        assertEquals(BigDecimal.valueOf(1), ethRes.getCurrencyAmount().stripTrailingZeros());
    }

    @Test
    void whenSellToWalletWithBalance_thenTransfer() throws Exception {
        Currency btcCurrency = currencyRepository.save(Currency.builder().name("Shibainu").code("SHIDOG")
                .color("EE").logoImageUrl("ee").type(CurrencyType.CRYPTO).about("Bitcoin").build());
        priceRepository.save(CurrencyPriceHistory.builder().currency(btcCurrency).price(BigDecimal.valueOf(61661.785))
                .circulatingSupply(BigInteger.valueOf(10000)).marketCap(399849384.0).vol(1323233.0).historyDT(LocalDateTime.now())
                .build());
        Currency ethCurrency = currencyRepository.save(Currency.builder().name("Ethereum2").code("ETH2")
                .color("EE").logoImageUrl("ee").type(CurrencyType.CRYPTO).about("Ethereum").build());
        priceRepository.save(CurrencyPriceHistory.builder().currency(ethCurrency).price(BigDecimal.valueOf(4333.01))
                .circulatingSupply(BigInteger.valueOf(10000)).marketCap(399849384.0).vol(1323233.0).historyDT(LocalDateTime.now())
                .build());

        UserWallet wallet = walletRepository.save(UserWallet.builder()
                .balance(BigDecimal.valueOf(0.5))
                .userId(BigInteger.ONE)
                .currencyId(btcCurrency.getId())
                .build());

        BigDecimal currencyAmount = BigDecimal.valueOf(0.25);
        SellRequestDTO req = SellRequestDTO.builder()
                .currencyId(wallet.getCurrencyId())
                .walletId(wallet.getId())
                .currencyAmount(currencyAmount)
                .deliveryType(PurchaseDeliveryType.FASTER)
                .depositToCurrencyId(ethCurrency.getId())
                .build();
        String btcResStr = mockMvc.perform(
                        post("/sell").contentType(MediaType.APPLICATION_JSON).content(asJsonString(req))
                )
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        UserWalletTransactionDTO btcRes = objectMapper.readValue(btcResStr, UserWalletTransactionDTO.class);
        assertEquals(currencyAmount, btcRes.getCurrencyAmount().stripTrailingZeros());
    }
}