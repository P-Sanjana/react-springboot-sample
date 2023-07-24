package com.zemoso.bc24minet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaginationDTO<T> {

    private long total;

    private List<T> data;
}
