package com.zemoso.bc24minet.controllers;

import com.zemoso.bc24minet.dto.CurrencyDto;
import com.zemoso.bc24minet.dto.UserWatchlistDTO;
import com.zemoso.bc24minet.services.UserWatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigInteger;
import java.util.List;


@RestController
@RequestMapping("/watchlist")
@Validated
public class UserWatchlistController {
    @Autowired
    private UserWatchlistService userWatchlistService;

    @PutMapping("")
    public void updateWatchlist(@Valid @RequestBody List<UserWatchlistDTO> userWatchlistDTOList) {
        userWatchlistService.putUserWatchlist(userWatchlistDTOList);
    }
    @GetMapping
    public List<CurrencyDto> getWatchlist(){
        BigInteger userId = BigInteger.ONE;
        return userWatchlistService.getUserWatchlist(userId);
    }
}
