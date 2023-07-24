package com.zemoso.bc24minet.mapper;

import com.zemoso.bc24minet.dto.UserWatchlistDTO;
import com.zemoso.bc24minet.entities.UserWatchlist;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserWatchlistMapper {
    UserWatchlistDTO watchlistToDto(UserWatchlist userWatchlist);

    UserWatchlist dtoToWatchlist(UserWatchlistDTO userWatchlistDTO);
}
