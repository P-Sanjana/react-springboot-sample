package com.zemoso.bc24minet.dto;

import lombok.Data;

import java.time.LocalDate;


@Data
public abstract class AuditableDto {

    private String createdBy;



    private LocalDate createdDate;


    private String modifiedBy;


    private LocalDate modifiedDate;
}
