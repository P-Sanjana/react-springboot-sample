package com.zemoso.bc24minet.cronjobs;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializer;
import com.zemoso.bc24minet.dto.CurrencyApiDataDto;
import com.zemoso.bc24minet.dto.Description;
import com.zemoso.bc24minet.entities.Currency;
import com.zemoso.bc24minet.entities.CurrencyPriceHistory;
import com.zemoso.bc24minet.entities.CurrencyType;
import com.zemoso.bc24minet.repositories.CurrencyPriceRepository;
import com.zemoso.bc24minet.repositories.CurrencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CurrencyApiImpl implements CurrencyApi {

    @Autowired
    private CurrencyRepository currencyRepository;

    @Autowired
    private CurrencyPriceRepository currencyPriceRepository;

    @Value("${apiBaseUrl}")
    private String baseUrl;

    @Value("${apiKey}")
    private String key;

    @Value("${coinIds}")
    private String coinIds;

    @Value("${getCurrenciesAPiUrl}")
    private String currenciesAPiUrl;

    private Gson gson;

    @Value("${idsText}")
    private String idsText;

    @Value("${start}")
    private String start;

    @Value("${descriptionAPiAttribute}")
    private String desAPiAttribute;

    @Value("${currencyDescriptionAPi}")
    private String currencyDesApi;

    @Value("${attributeText}")
    private String attributeTxt;

    @Value("${dateFormat}")
    private String dateFormat;

    @Value("${zoneId}")
    private String zoneId;

    private String fetchApiData(String url) throws IOException, InterruptedException {

        var request = HttpRequest.newBuilder().GET().uri(URI.create(url)).build();
        var client = HttpClient.newBuilder().build();
        var response = client.send(request, HttpResponse.BodyHandlers.ofString());

        return response.body();

    }

    public void writeCurrenciesInDatabase() throws InterruptedException, IOException {

        var url = baseUrl + currenciesAPiUrl + key + idsText + coinIds;

        String result = fetchApiData(url);
        gson = new GsonBuilder().registerTypeAdapter(LocalDateTime.class, (JsonDeserializer<LocalDateTime>) (json,
                                                                                                             type,
                                                                                                             jsonDeserializationContext) -> {

            try {
                return LocalDateTime.parse(json.getAsJsonPrimitive().getAsString(), DateTimeFormatter.ofPattern("yyyy" +
                        "-MM-dd'T'HH:mm:ss'Z'").withZone(ZoneId.of("UTC")));
            } catch (DateTimeParseException e) {
                return LocalDateTime.parse(json.getAsJsonPrimitive().getAsString(), DateTimeFormatter.ofPattern("yyyy" +
                        "-MM-dd'T'HH:mm:ss'Z'").withZone(ZoneId.of("UTC")));
            }

        }).create();
        var currencies = gson.fromJson(result, CurrencyApiDataDto[].class);
        var currencyApiDataDtoList = Arrays.asList(currencies);
        writeDataInCurrencyEntity(currencyApiDataDtoList);
        updatePriceVolumeTable(currencyApiDataDtoList);
    }

    private List<Description> getCurrencyDescription() throws IOException, InterruptedException {
        var url = baseUrl + currencyDesApi + key + idsText + coinIds + attributeTxt + desAPiAttribute;

        var result = fetchApiData(url);
        var currencies = gson.fromJson(result, Description[].class);
        return Arrays.asList(currencies);

    }


    private void writeDataInCurrencyEntity(List<CurrencyApiDataDto> currencyApiDataDtoList) throws IOException,
            InterruptedException {
        var descriptions = getCurrencyDescription();
        for (var c : currencyApiDataDtoList) {
            Currency currency = currencyRepository.getCurrencyByCode(c.getCode());
            if (currency == null) {
                currency = new Currency();
                currency.setCode(c.getCode());
                currency.setName(c.getName());
                currency.setType(CurrencyType.CRYPTO);
                currency.setLogoImageUrl(c.getLogoUrl());
            }
            var desc =
                    descriptions.stream().filter(i -> i.getId().equals(c.getCode())).map(Description::getAbout).collect(Collectors.toList());
            if (desc.size() == 1)
                currency.setAbout(desc.get(0).split(" ")[0]);
            currencyRepository.save(currency);
        }

    }


    private void updatePriceVolumeTable(List<CurrencyApiDataDto> currencyApiDataDtoList) {
        for (var c : currencyApiDataDtoList) {
            writeCurrentPriceInDB(c);
        }
    }

    private void writeCurrentPriceInDB(CurrencyApiDataDto currencyApiDataDto) {
        CurrencyPriceHistory currencyPriceHistory = new CurrencyPriceHistory();
        currencyPriceHistory.setCurrency(currencyRepository.getCurrencyByCode(currencyApiDataDto.getCode()));
        currencyPriceHistory.setPrice(BigDecimal.valueOf(currencyApiDataDto.getPrice()));
        currencyPriceHistory.setHistoryDT(currencyApiDataDto.getPriceTimestamp());
        currencyPriceHistory.setMarketCap(currencyApiDataDto.getMarketCap());
        currencyPriceHistory.setVol(currencyApiDataDto.getVolume().getVolume());
        currencyPriceHistory.setCirculatingSupply(currencyApiDataDto.getCirculatingSupply());
        currencyPriceRepository.save(currencyPriceHistory);
    }

    public void updateCurrentPriceInDatabase() throws IOException, InterruptedException {
        var currentDate = LocalDateTime.now();
        gson = new GsonBuilder().registerTypeAdapter(LocalDateTime.class,
                (JsonDeserializer<LocalDateTime>) (json,
                                                   type,
                                                   jsonDeserializationContext) -> {

                    try {
                        return LocalDateTime.parse(json.getAsJsonPrimitive().getAsString(),
                                DateTimeFormatter.ofPattern(dateFormat).withZone(ZoneId.of(zoneId)));
                    } catch (DateTimeParseException e) {
                        return LocalDateTime.parse(json.getAsJsonPrimitive().getAsString(),
                                DateTimeFormatter.ofPattern(dateFormat).withZone(ZoneId.of(zoneId)));
                    }
                }).create();
        var url = baseUrl + currenciesAPiUrl + key + idsText + coinIds + start + currentDate;
        var data = fetchApiData(url);
        var currencies = gson.fromJson(data, CurrencyApiDataDto[].class);

        updatePriceVolumeTable(Arrays.asList(currencies));
    }

}


