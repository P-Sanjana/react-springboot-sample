package com.zemoso.bc24minet.services.impl;

import com.zemoso.bc24minet.dto.CurrencyDto;
import com.zemoso.bc24minet.dto.UserWatchlistDTO;
import com.zemoso.bc24minet.entities.UserWatchlist;
import com.zemoso.bc24minet.mapper.CurrencyMapper;
import com.zemoso.bc24minet.mapper.UserWatchlistMapper;
import com.zemoso.bc24minet.repositories.UserWatchlistRepository;
import com.zemoso.bc24minet.services.UserWatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserWatchlistServiceImpl implements UserWatchlistService {

    @Autowired
    private UserWatchlistRepository userWatchlistRepository;

    @Autowired
    private UserWatchlistMapper userWatchlistMapper;

    @Autowired
    private CurrencyMapper currencyMapper;

    @Override
    @Transactional
    public List<UserWatchlistDTO> putUserWatchlist(List<UserWatchlistDTO> userWatchlistDTOList) {
        List<UserWatchlistDTO> updatedUserWatchlistDTO = new ArrayList<>();
        for (UserWatchlistDTO userWatchlistDTO : userWatchlistDTOList) {
            UserWatchlist userWatchlist = userWatchlistMapper.dtoToWatchlist(userWatchlistDTO);
            userWatchlist.setUserId(BigInteger.valueOf(1));
            UserWatchlist updatedWatchlist = null;
            if (userWatchlistDTO.isWatch()) updatedWatchlist = userWatchlistRepository.save(userWatchlist);
            else {
                userWatchlist.setId(userWatchlistRepository.findIdByCurrencyId(userWatchlist.getCurrencyId()));
                userWatchlistRepository.delete(userWatchlist);
            }
            updatedUserWatchlistDTO.add(userWatchlistMapper.watchlistToDto(updatedWatchlist));
        }

        return updatedUserWatchlistDTO;
    }

    @Override
    @Transactional
    public List<CurrencyDto> getUserWatchlist(BigInteger userId) {
        return userWatchlistRepository.findByUserId(userId).map(UserWatchlist::getCurrency).map(currencyMapper::modelToDto).collect(Collectors.toList());
    }
}
