package com.zemoso.bc24minet.controllers;

import com.zemoso.bc24minet.dto.PortfolioChangeDTO;
import com.zemoso.bc24minet.dto.PortfolioDTO;
import com.zemoso.bc24minet.services.PortfolioService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.util.CollectionUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.constraints.Min;
import java.math.BigInteger;
import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/portfolio", produces = MediaType.APPLICATION_JSON_VALUE)
@Validated
public class PortfolioController {

    @Autowired
    private PortfolioService portfolioService;

    @GetMapping("/{currencyId}/changes")
    public List<PortfolioChangeDTO> getPortfolioChanges(@PathVariable Integer currencyId,
                                                        @Min(value = 0, message = "past must be positive")
                                                        @RequestParam("past") Integer pastMinutes) {
        List<PortfolioChangeDTO> result =
                portfolioService.getPortfolioChanges(BigInteger.ONE, currencyId, pastMinutes);
        if (CollectionUtils.isEmpty(result)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Portfolio not found");
        }
        return result;
    }

    @GetMapping("")
    public List<PortfolioDTO> listPortfolio(){
        return portfolioService.fetchPortfolio(BigInteger.ONE);
    }

    @GetMapping("/{currencyId}")
    public List<PortfolioDTO> getPortfolioChanges(@PathVariable Integer currencyId){
        List<PortfolioDTO> result = portfolioService.getPortfolioWithId(BigInteger.ONE,currencyId);
        if(CollectionUtils.isEmpty(result)){
            log.info("Currency id not found");
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Currency id not found");
        }
        return result;
    }
}
