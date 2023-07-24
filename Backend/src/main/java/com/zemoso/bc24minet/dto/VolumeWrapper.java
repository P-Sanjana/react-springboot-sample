package com.zemoso.bc24minet.dto;

import com.google.gson.annotations.SerializedName;
import lombok.Data;

@Data
public class VolumeWrapper {

    @SerializedName("volume")
    private Double volume;
}
