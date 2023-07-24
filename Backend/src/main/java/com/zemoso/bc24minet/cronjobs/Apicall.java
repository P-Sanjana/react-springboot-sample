package com.zemoso.bc24minet.cronjobs;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;


import java.io.IOException;

@EnableAsync
@Component
@Slf4j
public class Apicall {

    @Autowired
    private CurrencyApi currencyApi;

    @Async
    @Scheduled(initialDelay = 100000,fixedRate = 10 * 60 * 1000)
    public void scheduleFixedRateTaskAsync() throws InterruptedException, IOException {

        currencyApi.updateCurrentPriceInDatabase();

    }


}
