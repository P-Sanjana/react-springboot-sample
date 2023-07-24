package com.zemoso.bc24minet.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zemoso.bc24minet.dto.UserWatchlistDTO;
import com.zemoso.bc24minet.entities.Currency;
import com.zemoso.bc24minet.entities.CurrencyType;
import com.zemoso.bc24minet.entities.UserWatchlist;
import com.zemoso.bc24minet.repositories.CurrencyRepository;
import com.zemoso.bc24minet.repositories.UserWatchlistRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("itest")
public class UserWatchlistControllerTest {
    @Autowired
    private UserWatchlistController userWatchlistController;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserWatchlistRepository userWatchlistRepository;

    @Autowired
    private CurrencyRepository currencyRepository;

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    @Test
    void givenWatchlistWithId_whenUpdateAndRetrieve_thenMatch() throws Exception {
        List<UserWatchlistDTO> userWatchlistDTOs=new ArrayList<>();
        Currency currency=Currency.builder().id(1).type(CurrencyType.CRYPTO).name("Bitcoin").code("BTC").logoImageUrl("img").color("green").about("About Bitcoin").build();
        currencyRepository.save(currency);
        userWatchlistDTOs.add(new UserWatchlistDTO(BigInteger.valueOf(1),1,true));
        userWatchlistRepository.save(UserWatchlist.builder().id(BigInteger.valueOf(1)).userId(BigInteger.valueOf(1)).currencyId(1).build());
        mockMvc.perform(put("/watchlist").content(asJsonString((userWatchlistDTOs))).contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
        UserWatchlist userWatchlist=userWatchlistRepository.findAll().get(0);
        assertEquals(BigInteger.valueOf(1),userWatchlist.getId());
    }

    @Test
    void getWatchlist_whenRetrieve_thenThrowException() throws Exception {
        mockMvc.perform(get("/watchlist")).andExpect(status().isOk())
                .andReturn();
    }

}