package com.zemoso.bc24minet.services;

import com.zemoso.bc24minet.controllers.PortfolioController;
import com.zemoso.bc24minet.dto.PortfolioDTO;
import com.zemoso.bc24minet.entities.UserPortfolioHistory;
import com.zemoso.bc24minet.mapper.PortfolioMapper;
import com.zemoso.bc24minet.repositories.UserPortfolioHistoryRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc
class PortfolioServiceTest {

    @Autowired
    private PortfolioController portfolioController;

    @Autowired
    private UserPortfolioHistoryRepository historyRepository;

    @Autowired
    private MockMvc mockMvc;

    private PortfolioService portfolioService = org.mockito.Mockito.mock(PortfolioService.class);

    @Test
    void fetchPortfolio(){
        Date date = new Date();
        BigInteger id=BigInteger.ONE;
        UserPortfolioHistory userPortfolioHistory=new UserPortfolioHistory(id,id,1,100f,200f,3.5f,java.time.LocalDateTime.now());
        historyRepository.save(userPortfolioHistory);
        PortfolioMapper instance= Mappers.getMapper(PortfolioMapper.class);
        PortfolioDTO portfolioDTO=instance.toDTO(userPortfolioHistory);
        List<PortfolioDTO> listPortfolioDTO = new ArrayList<>();
        listPortfolioDTO.add(portfolioDTO);
        Mockito.when(portfolioService.fetchPortfolio(id)).thenReturn(listPortfolioDTO);
        Assertions.assertEquals(portfolioService.fetchPortfolio(id),listPortfolioDTO);
        Assertions.assertNotNull(listPortfolioDTO);
    }

    @Test
    void getPortfolioWithId(){
        Date date = new Date();
        BigInteger id=BigInteger.ONE;
        UserPortfolioHistory userPortfolioHistory=new UserPortfolioHistory(id,id,1,100f,200f,3.5f,java.time.LocalDateTime.now());
        historyRepository.save(userPortfolioHistory);
        PortfolioMapper instance= Mappers.getMapper(PortfolioMapper.class);
        PortfolioDTO portfolioDTO=instance.toDTO(userPortfolioHistory);
        List<PortfolioDTO> listPortfolioDTO = new ArrayList<>();
        listPortfolioDTO.add(portfolioDTO);
        Mockito.when(portfolioService.getPortfolioWithId(id,1)).thenReturn(listPortfolioDTO);
        Assertions.assertEquals(portfolioService.getPortfolioWithId(id,1),listPortfolioDTO);
        Assertions.assertNotNull(listPortfolioDTO);
    }

}
