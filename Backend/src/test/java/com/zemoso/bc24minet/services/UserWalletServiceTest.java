package com.zemoso.bc24minet.services;

import com.zemoso.bc24minet.dto.WalletDTO;
import com.zemoso.bc24minet.entities.Currency;
import com.zemoso.bc24minet.entities.CurrencyType;
import com.zemoso.bc24minet.entities.UserWallet;
import com.zemoso.bc24minet.repositories.CurrencyRepository;
import com.zemoso.bc24minet.repositories.UserWalletRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("itest")
class UserWalletServiceTest {

    @Autowired
    private UserWalletServiceImpl userWalletService;

    @Autowired
    private UserWalletRepository userWalletRepository;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CurrencyRepository currencyRepository;

    private Currency currency;

    private WalletDTO walletDto;

    @BeforeEach
    public void setUp() {
        Integer id = Integer.valueOf(1);
        currency =
                Currency.builder().id(1).type(CurrencyType.CRYPTO).name("Bitcoin").code("BTC").logoImageUrl("img").color("green").about("About Bitcoin").build();
        currencyRepository.save(currency);
        userWalletRepository.save(UserWallet.builder().id(BigInteger.valueOf(1)).userId(BigInteger.valueOf(1))
                .currencyId(1).balance(BigDecimal.valueOf(100.0f)).currency(currency).build());
    }

    public List<WalletDTO> getWalletDtoList() {
        List<WalletDTO> walletDTOS = userWalletService.getWallets();
        return walletDTOS;
    }

    public WalletDTO getWalletById(BigInteger id) {
        return userWalletService.getWalletById(id);
    }

    @Test
    void givenUserWalletEntity_whenSaveAndRetrieve_thenMatch() {
        List<WalletDTO> walletDTOList = getWalletDtoList();
        List<WalletDTO> result = userWalletService.getWallets();
        Assertions.assertNotNull(walletDTOList);
        Assertions.assertEquals(result.size(), walletDTOList.size());
    }

    @Test
    void givenValidWalletId_whenRetrieve_thenWalletIsFound() {
        walletDto = getWalletById(BigInteger.valueOf(1));
        WalletDTO result = userWalletService.getWalletById(BigInteger.valueOf(1));
        Assertions.assertNotNull(walletDto);
        Assertions.assertEquals(result.getId(), BigInteger.valueOf(1));
    }
}