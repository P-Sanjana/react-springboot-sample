package com.zemoso.bc24minet.entities;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDateTime;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "currency_price_history")
public class CurrencyPriceHistory extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "price_usd")
    @NotNull
    private BigDecimal price;

    @Column(name = "market_cap_usd")
    private Double marketCap;


    @Column(name = "vol_24H")
    private Double vol;

    @ManyToOne
    private Currency currency;

    @Column(name = "circulating_supply")
    private BigInteger circulatingSupply;

    @Column(name = "history_dt")
    @NotNull
    private LocalDateTime historyDT;

    @Override
    public String toString() {
        return "CurrencyPriceHistory{" +
                "id=" + id +
                ", price=" + price +
                ", marketCap=" + marketCap +
                ", vol=" + vol +
                ", circulatingSupply=" + circulatingSupply +
                ", historyDT=" + historyDT +
                '}';
    }
}
