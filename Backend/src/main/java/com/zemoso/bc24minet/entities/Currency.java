package com.zemoso.bc24minet.entities;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "currencies")
public class Currency extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    @NotNull
    private CurrencyType type;

    @Column(name = "name", unique = true)
    @NotNull

    private String name;

    @Column(name = "code", unique = true)
    @NotNull
    private String code;

    @Column(name = "logo_image_url")
    @NotNull
    private String logoImageUrl;

    @Override
    public String toString() {
        return "Currency{" +
                "id=" + id +
                ", type=" + type +
                ", name='" + name + '\'' +
                ", code='" + code + '\'' +
                ", logoImageUrl='" + logoImageUrl + '\'' +
                ", color='" + color + '\'' +
                ", about='" + about + '\'' +
                ", currencyList=" + currencyList +
                '}';
    }

    @Column(name = "color")
    private String color;

    @NotNull
    @NotBlank
    @Column(name = "about")
    private String about;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "currency")
    private List<CurrencyPriceHistory> currencyList = new ArrayList<>();
}
