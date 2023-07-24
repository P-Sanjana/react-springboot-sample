package com.zemoso.bc24minet.services;

import com.zemoso.bc24minet.dto.PriceDateTimeDto;
import com.zemoso.bc24minet.entities.Currency;
import com.zemoso.bc24minet.entities.CurrencyPriceHistory;
import com.zemoso.bc24minet.entities.CurrencyType;
import com.zemoso.bc24minet.repositories.CurrencyPriceRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.util.CollectionUtils;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@SpringBootTest
class CurrencyServiceTest {

    @MockBean
    private CurrencyPriceRepository currencyPriceRepository;

    @Autowired
    private CurrencyService currencyService;

    CurrencyPriceHistory getCurrencyPriceHistoryObject() {
        Integer id = 1;
        Currency currency = new Currency();
        currency.setId(id);
        currency.setName("bitcoin");
        currency.setType(CurrencyType.CRYPTO);
        currency.setColor("BTC");
        currency.setAbout("addcbdfy hyfh");
        currency.setLogoImageUrl("dddd");
        currency.setCreatedBy("abc");
        currency.setModifiedBy("abc");
        currency.setCreatedDate(LocalDateTime.now());
        currency.setModifiedDate(LocalDateTime.now());
        currency.setCode("BTC");
        CurrencyPriceHistory currencyPriceHistory = new CurrencyPriceHistory();
        currencyPriceHistory.setCurrency(currency);
        currencyPriceHistory.setHistoryDT(LocalDateTime.now());
        currencyPriceHistory.setPrice(BigDecimal.valueOf(12));
        currencyPriceHistory.setCirculatingSupply(BigInteger.ONE);
        currencyPriceHistory.setMarketCap(12.8);
        currencyPriceHistory.setCreatedBy("vvv");
        currencyPriceHistory.setModifiedBy("ddd");
        currencyPriceHistory.setVol(11.5);
        currencyPriceHistory.setCreatedDate(LocalDateTime.now());
        currencyPriceHistory.setModifiedDate(LocalDateTime.now());
        return currencyPriceHistory;
    }

    @Test
     void getAllCurrenciesTest() {

        List<CurrencyPriceHistory> currencyPriceHistoryList = new ArrayList<>();
        currencyPriceHistoryList.add(getCurrencyPriceHistoryObject());
        CurrencyPriceHistory curr2 = getCurrencyPriceHistoryObject();
        curr2.getCurrency().setId(2);
        currencyPriceHistoryList.add(curr2);
        Mockito.when(currencyPriceRepository.getLatestPricesOfAllCurrencies()).thenReturn(currencyPriceHistoryList);
        Mockito.when(currencyPriceRepository.getPriceByDT(eq(2), any(LocalDateTime.class))).thenReturn(BigDecimal.valueOf(11));

        var list = currencyService.getAllCurrencies();
        Assertions.assertEquals(2, list.size());

        Assertions.assertNotNull(list);
    }

    @Test
    void getAllCurrenciesWhenNoData(){

        Mockito.when(currencyPriceRepository.getLatestPricesOfAllCurrencies()).thenReturn(Collections.emptyList());

        var list = currencyService.getAllCurrencies();
        Assertions.assertEquals(0, list.size());

        Assertions.assertNotNull(list);
    }
    @Test
     void getCurrencyDetailTest() {

        when(currencyPriceRepository.getCurrencyDetail(1)).thenReturn(getCurrencyPriceHistoryObject());

        var data = currencyService.getCurrencyDetail(1);
        Assertions.assertEquals("BTC", data.getCode());
        Assertions.assertNotNull(data);
    }

    @Test
    void whenInvalidCurrencyId(){
        when(currencyPriceRepository.getCurrencyDetail(1)).thenReturn(null);
        int returnValue=1;
        var data = currencyService.getCurrencyDetail(1);
        if(data==null){
            returnValue=0;
        }
        Assertions.assertEquals(0, returnValue);

    }
     PriceDateTimeDto setPriceDateTimeDto(CurrencyPriceHistory currencyPriceHistory) {
        PriceDateTimeDto priceDateTimeDto = new PriceDateTimeDto();
        priceDateTimeDto.setDateTime(currencyPriceHistory.getHistoryDT());
        priceDateTimeDto.setPrice(currencyPriceHistory.getPrice());
        return priceDateTimeDto;
    }

    @Test
     void getLastOneHourData() {
        var setData1 = getCurrencyPriceHistoryObject();
        List<CurrencyPriceHistory> currencyPriceHistoryList = new ArrayList<>();
        currencyPriceHistoryList.add(setData1);
        when(currencyPriceRepository.getLastOneHourData(1)).thenReturn(currencyPriceHistoryList);
        var data = currencyService.getPrices(1, 1);
        Assertions.assertEquals(1, data.size());
        Assertions.assertNotNull(data);
    }

    @Test
    void currencyPricesInvalidPastValueTest() {
        when(currencyPriceRepository.getPrices(1, 0)).thenReturn(null);
        List<PriceDateTimeDto> priceDateTimeDtoList = new ArrayList<>();
        priceDateTimeDtoList.add(setPriceDateTimeDto(getCurrencyPriceHistoryObject()));

        var data = currencyService.getPrices(1, 0);
        Assertions.assertTrue(CollectionUtils.isEmpty(data));
    }

    @Test
    void getLastYearData() {
        var setData1 = getCurrencyPriceHistoryObject();
        setData1.setHistoryDT(LocalDateTime.of(LocalDate.of(2020, 11, 2), LocalTime.now()));

        var setData2 = getCurrencyPriceHistoryObject();
        setData2.setHistoryDT(LocalDateTime.of(LocalDate.of(2019, 2, 2), LocalTime.now()));
        setData2.setId(2);
        List<CurrencyPriceHistory> currencyPriceHistoryList = new ArrayList<>();
        currencyPriceHistoryList.add(setData1);
        Mockito.when(currencyPriceRepository.getPrices(1, 365)).thenReturn(currencyPriceHistoryList);
        var data = currencyService.getPrices(1, 5);
        System.out.println(data.size());
        Assertions.assertEquals(1, data.size());
        Assertions.assertNotNull(data);
    }

    @Test
     void getLastOneWeekData() {
        var setData1 = getCurrencyPriceHistoryObject();
        setData1.setHistoryDT(LocalDateTime.of(LocalDate.of(2021, 10, 29), LocalTime.now()));
        var setData2 = getCurrencyPriceHistoryObject();
        setData2.setId(2);
        setData2.setHistoryDT(LocalDateTime.of(LocalDate.of(2019, 2, 2), LocalTime.now()));
        List<CurrencyPriceHistory> currencyPriceHistoryList=new ArrayList<>();
        currencyPriceHistoryList.add(setData1);
        when(currencyPriceRepository.getPrices(1, 7)).thenReturn(currencyPriceHistoryList);
        var data = currencyService.getPrices(1, 3);
        Assertions.assertEquals(1, data.size());
        Assertions.assertNotNull(data);
    }

    @Test
    void getLastOneMonthData() {
        var setData1 = getCurrencyPriceHistoryObject();
        setData1.setId(1);
        setData1.setHistoryDT(LocalDateTime.of(LocalDate.of(2021, 11, 2), LocalTime.now()));
        var setData2 = getCurrencyPriceHistoryObject();
        setData2.setId(2);
        setData2.setHistoryDT(LocalDateTime.of(LocalDate.of(2019, 2, 2), LocalTime.now()));
        List<CurrencyPriceHistory> currencyPriceHistoryList=new ArrayList<>();
        currencyPriceHistoryList.add(setData1);
        when(currencyPriceRepository.getPrices(1, 30)).thenReturn(currencyPriceHistoryList);
        var data = currencyService.getPrices(1, 4);
        Assertions.assertEquals(1, data.size());
        Assertions.assertNotNull(data);
    }

    @Test
    void getAllPricesData() {
        var setData1 = getCurrencyPriceHistoryObject();
        setData1.setId(1);
        setData1.setHistoryDT(LocalDateTime.of(LocalDate.of(2021, 11, 2), LocalTime.now()));
        var setData2 = getCurrencyPriceHistoryObject();
        setData2.setId(2);
        setData2.setHistoryDT(LocalDateTime.of(LocalDate.of(2019, 2, 2), LocalTime.now()));
        List<CurrencyPriceHistory> currencyPriceHistoryList=new ArrayList<>();
        currencyPriceHistoryList.add(setData1);
        when(currencyPriceRepository.findAll()).thenReturn(currencyPriceHistoryList);
        var data = currencyService.getPrices(1, 6);
        Assertions.assertEquals(1, data.size());
        Assertions.assertNotNull(data);
    }

    @Test
    void invalidParamData() {


        var data = currencyService.getPrices(1, 7);
        Assertions.assertEquals(0, data.size());
        Assertions.assertNotNull(data);
    }

    @Test
     void getLastOneDayData() {
        var setData1 = getCurrencyPriceHistoryObject();
        setData1.setHistoryDT(LocalDateTime.of(LocalDate.of(2021, 10, 6), LocalTime.now()));
        var setData2 = getCurrencyPriceHistoryObject();
        setData2.setId(2);
        setData2.setHistoryDT(LocalDateTime.of(LocalDate.of(2019, 11, 6), LocalTime.now()));
        List<CurrencyPriceHistory> currencyPriceHistoryList=new ArrayList<>();
        currencyPriceHistoryList.add(setData1);
        when(currencyPriceRepository.getPrices(1, 2)).thenReturn(currencyPriceHistoryList);
        var data = currencyService.getPrices(1, 2);

        int returnValue = 1;
        if (data == null)
            returnValue = 0;
        Assertions.assertEquals(1, returnValue);

    }
}