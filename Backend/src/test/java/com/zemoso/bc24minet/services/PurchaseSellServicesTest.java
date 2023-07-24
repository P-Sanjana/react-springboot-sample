package com.zemoso.bc24minet.services;

import com.zemoso.bc24minet.dto.*;
import com.zemoso.bc24minet.entities.Currency;
import com.zemoso.bc24minet.entities.UserWallet;
import com.zemoso.bc24minet.entities.UserWalletTransaction;
import com.zemoso.bc24minet.repositories.CurrencyPriceRepository;
import com.zemoso.bc24minet.repositories.UserWalletRepository;
import com.zemoso.bc24minet.repositories.UserWalletTransactionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import javax.validation.ValidationException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.when;

@SpringBootTest
class PurchaseSellServicesTest {

    @MockBean
    private UserWalletRepository walletRepository;

    @MockBean
    private UserWalletTransactionRepository transactionRepository;

    @MockBean
    private CurrencyPriceRepository priceRepository;

    @Autowired
    private PurchaseService purchaseService;

    @Autowired
    private SellService sellService;

    private final BigInteger USER_ID = BigInteger.valueOf(1);

    @BeforeEach
    void setUp() {
        when(priceRepository.getLatestPrice(1)).thenReturn(BigDecimal.valueOf(61661.785));
        when(priceRepository.getLatestPrice(2)).thenReturn(BigDecimal.valueOf(4333.01));
        BigInteger btcWalletId = BigInteger.valueOf(10);
        when(walletRepository.findById(btcWalletId)).thenReturn(Optional.of(UserWallet.builder()
                .id(btcWalletId)
                .balance(BigDecimal.valueOf(0.5))
                .userId(BigInteger.ONE)
                .currencyId(1)
                .currency(Currency.builder().code("BTC").build())
                .build()));
        when(transactionRepository.save(any())).thenAnswer(invocationOnMock -> invocationOnMock.getArgument(0,
                UserWalletTransaction.class));
    }

    @Test
    void whenBuyFromWalletWithBalance_thenTransfer() {
        BigDecimal currencyAmount = BigDecimal.valueOf(1);
        PurchaseRequestDTO req = PurchaseRequestDTO.builder()
                .currencyId(2)
                .currencyAmount(currencyAmount)
                .deliveryType(PurchaseDeliveryType.FASTER)
                .paymentMethod(PaymentMethodDTO.builder().paymentType(PaymentMethodType.WALLET)
                        .walletId(BigInteger.valueOf(10)).build())
                .build();

        UserWalletTransaction result = purchaseService.purchase(req, USER_ID);
        assertEquals(currencyAmount, result.getCurrencyAmount().stripTrailingZeros());
    }

    @Test
    void whenSellToWalletWithBalance_thenTransfer() {
        BigDecimal currencyAmount = BigDecimal.valueOf(0.25);
        SellRequestDTO req = SellRequestDTO.builder()
                .currencyId(1)
                .walletId(BigInteger.valueOf(10))
                .currencyAmount(currencyAmount)
                .deliveryType(PurchaseDeliveryType.FASTER)
                .depositToCurrencyId(2)
                .build();
        UserWalletTransaction result = sellService.sell(req, USER_ID);
        assertEquals(currencyAmount, result.getCurrencyAmount().stripTrailingZeros());
    }

    @Test
    void whenSellToWalletWithInsufficientBalance_thenError() {
        BigDecimal currencyAmount = BigDecimal.valueOf(1);
        SellRequestDTO req = SellRequestDTO.builder()
                .currencyId(1)
                .walletId(BigInteger.valueOf(10))
                .currencyAmount(currencyAmount)
                .deliveryType(PurchaseDeliveryType.FASTER)
                .depositToCurrencyId(2)
                .build();
        assertThrows(ValidationException.class, () -> sellService.sell(req, USER_ID));
    }

    @Test
    void whenBuyFromWalletWithLessBalance_thenValidationException() {
        PurchaseRequestDTO req = PurchaseRequestDTO.builder()
                .currencyId(2)
                .currencyAmount(BigDecimal.valueOf(100))
                .deliveryType(PurchaseDeliveryType.FASTER)
                .paymentMethod(PaymentMethodDTO.builder().paymentType(PaymentMethodType.WALLET)
                        .walletId(BigInteger.valueOf(10)).build())
                .build();
        assertThrows(ValidationException.class, () -> purchaseService.purchase(req, USER_ID));
    }

    @Test
    void whenBuyFromCard_thenPurchase() {
        BigDecimal currencyAmount = BigDecimal.valueOf(1);
        PurchaseRequestDTO req = PurchaseRequestDTO.builder()
                .currencyId(2)
                .currencyAmount(currencyAmount)
                .deliveryType(PurchaseDeliveryType.FASTER)
                .paymentMethod(PaymentMethodDTO.builder().paymentType(PaymentMethodType.CARD).cardNo("12344").build())
                .build();

        UserWalletTransaction result = purchaseService.purchase(req, USER_ID);
        assertEquals(currencyAmount, result.getCurrencyAmount().stripTrailingZeros());
    }
}