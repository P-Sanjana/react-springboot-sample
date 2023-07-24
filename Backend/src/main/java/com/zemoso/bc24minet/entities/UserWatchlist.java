package com.zemoso.bc24minet.entities;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.math.BigInteger;

@Entity
@Table(name = "users_watchlist")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Getter
public class UserWatchlist extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger id;

    @Column(name = "user_id")
    @NotNull
    private BigInteger userId;

    @Column(name = "currency_id")
    @NotNull
    @Min(value = 1, message = "Currency Id should be non-negative")
    private Integer currencyId;

    @ManyToOne
    @JoinColumn(name = "currency_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Currency currency;

}
