package com.zemoso.bc24minet.cronjobs;

import java.io.IOException;

public interface CurrencyApi {
    void writeCurrenciesInDatabase() throws InterruptedException, IOException;
    void updateCurrentPriceInDatabase() throws InterruptedException, IOException;
}
