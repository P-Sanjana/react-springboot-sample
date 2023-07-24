package com.zemoso.bc24minet.dto;

import com.google.gson.annotations.SerializedName;
import lombok.Data;

@Data
public class Description {

    @SerializedName("id")
    private String id;

    @SerializedName("description")
    private String about;
}
