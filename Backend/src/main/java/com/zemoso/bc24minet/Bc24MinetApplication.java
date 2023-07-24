package com.zemoso.bc24minet;
import com.zemoso.bc24minet.cronjobs.CurrencyApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import javax.annotation.PostConstruct;
import java.util.TimeZone;

@SpringBootApplication
@EnableScheduling
@EnableAutoConfiguration
public class Bc24MinetApplication implements ApplicationRunner {

    @Autowired
    private CurrencyApi currencyApi;
    public static void main(String[] args) {
        SpringApplication.run(Bc24MinetApplication.class, args);

    }

    @PostConstruct
    public void init() {
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
    }



    @Override
    public void run(ApplicationArguments args) throws Exception {
       currencyApi.writeCurrenciesInDatabase();
    }
}
