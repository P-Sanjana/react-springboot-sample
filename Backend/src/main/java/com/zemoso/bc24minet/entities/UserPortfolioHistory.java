package com.zemoso.bc24minet.entities;

import lombok.*;

import javax.persistence.*;
import java.math.BigInteger;
import java.time.LocalDateTime;

@Data
@EqualsAndHashCode(callSuper = false)
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users_portfolio_history")
public class UserPortfolioHistory extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private BigInteger id;

    @Column(name = "user_id")
    private BigInteger userId;

    @Column(name = "currency_id")
    private Integer currencyId;

    @Column(name = "invested_amount_usd")
    private Float investedAmountInUSD;

    @Column(name = "current_amount_usd")
    private Float currentAmountInUSD;

    @Column(name = "change_percent")
    private Float changePercent;

    @Column(name = "history_dt")
    private LocalDateTime historyDT;
}

