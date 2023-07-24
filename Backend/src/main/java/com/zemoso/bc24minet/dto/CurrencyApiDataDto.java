package com.zemoso.bc24minet.dto;

import com.google.gson.annotations.SerializedName;
import lombok.Data;

import java.math.BigInteger;
import java.time.LocalDateTime;

@Data
public class CurrencyApiDataDto  {

    @SerializedName("id")
    private String code;
    @SerializedName("name")
    private String name;
    @SerializedName("logo_url")
    private String logoUrl;
    @SerializedName("price")
    private Double price;
    @SerializedName("market_cap")
    private Double marketCap;
    @SerializedName("price_timestamp")
    private LocalDateTime priceTimestamp;
    @SerializedName("circulating_supply")
    private BigInteger circulatingSupply;
    @SerializedName("1d")
    private VolumeWrapper volume;
}
