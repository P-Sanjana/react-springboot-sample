package com.zemoso.bc24minet.services;

import com.zemoso.bc24minet.dto.CurrencyDto;
import com.zemoso.bc24minet.dto.UserWatchlistDTO;

import java.math.BigInteger;
import java.util.List;

public interface UserWatchlistService {
    List<UserWatchlistDTO> putUserWatchlist(List<UserWatchlistDTO> userWatchlistDTO);

    List<CurrencyDto> getUserWatchlist(BigInteger userId);
}
