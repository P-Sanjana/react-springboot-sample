package com.zemoso.bc24minet.services;

import com.zemoso.bc24minet.dto.PortfolioChangeDTO;
import com.zemoso.bc24minet.dto.PortfolioDTO;
import com.zemoso.bc24minet.mapper.PortfolioHistoryMapper;
import com.zemoso.bc24minet.mapper.PortfolioMapper;
import com.zemoso.bc24minet.repositories.UserPortfolioHistoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class PortfolioService {

    @Autowired
    private UserPortfolioHistoryRepository repository;

    @Autowired
    private PortfolioHistoryMapper portfolioHistoryMapper;

    @Autowired
    private PortfolioMapper portfolioMapper;

    @Transactional
    public List<PortfolioChangeDTO> getPortfolioChanges(BigInteger userId, Integer currencyId, Integer pastMinutes) {
        LocalDateTime dt = LocalDateTime.now().minusMinutes(pastMinutes);
        return repository.findByUserNCurrency(userId, currencyId, dt)
        .map(portfolioHistoryMapper::toDTO)
        .collect(Collectors.toList());
    }

    @Transactional
    public List<PortfolioDTO> fetchPortfolio(BigInteger userId){
        return repository.fetchPortfolio(userId)
                .map(portfolioMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public  List<PortfolioDTO> getPortfolioWithId(BigInteger userId, Integer currencyId){
        return repository.fetchPortfolioWithCurrencyId(userId, currencyId)
                .map(portfolioMapper::toDTO)
                .collect(Collectors.toList());
    }
}
