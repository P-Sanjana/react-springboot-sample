package com.zemoso.bc24minet.services;

import com.zemoso.bc24minet.dto.CurrencyDto;
import com.zemoso.bc24minet.dto.UserWatchlistDTO;
import com.zemoso.bc24minet.entities.UserWatchlist;
import com.zemoso.bc24minet.mapper.UserWatchlistMapper;
import com.zemoso.bc24minet.repositories.UserWatchlistRepository;
import com.zemoso.bc24minet.services.impl.UserWatchlistServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.mockito.Mockito.mock;


@SpringBootTest
@AutoConfigureMockMvc
class UserWatchlistServiceTest {
    @Autowired
    private UserWatchlistServiceImpl userWatchlistService;

    @Mock
    private UserWatchlistRepository userWatchlistRepository;

    @Autowired
    private MockMvc mockMvc;

    private UserWatchlistServiceImpl userWatchlistServiceImpl=mock(UserWatchlistServiceImpl.class);

    @Test
    void givenUserWatchlist_thenSaveAndRetrieve_thenMatch(){
        UserWatchlist userWatchlist=UserWatchlist.builder().id(BigInteger.ONE).userId(BigInteger.ONE).currencyId(1).build();
        UserWatchlistMapper instance= Mappers.getMapper(UserWatchlistMapper.class);
        userWatchlistRepository.save(userWatchlist);
        List<UserWatchlist> userWatchlistList= new ArrayList<>();
        List<UserWatchlistDTO> userWatchlistDTOList=new ArrayList<>();
        userWatchlistList.add(userWatchlist);
        for(UserWatchlist userWatchlist1:userWatchlistList){
            userWatchlistDTOList.add(instance.watchlistToDto(userWatchlist1));
        }
        List<UserWatchlistDTO> userWatchlistDTOs= userWatchlistService.putUserWatchlist(userWatchlistDTOList);
        Mockito.when(userWatchlistServiceImpl.putUserWatchlist(userWatchlistDTOs)).thenReturn(userWatchlistDTOs);
        userWatchlistServiceImpl.putUserWatchlist(userWatchlistDTOs);

        Mockito.verify(userWatchlistServiceImpl).putUserWatchlist(userWatchlistDTOs);
    }

    @Test
    void getWatchlist(){
        List<CurrencyDto> currencyDtos = new ArrayList<>();
        UserWatchlist userWatchlist=UserWatchlist.builder().id(BigInteger.ONE).userId(BigInteger.ONE).currencyId(1).build();
        UserWatchlistMapper instance= Mappers.getMapper(UserWatchlistMapper.class);
        userWatchlistRepository.save(userWatchlist);
        Mockito.when(userWatchlistService.getUserWatchlist(BigInteger.ONE)).thenReturn(currencyDtos);
        Assertions.assertEquals(currencyDtos,userWatchlistRepository.findByUserId(BigInteger.ONE).collect(Collectors.toList()));
    }
}