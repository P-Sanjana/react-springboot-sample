package com.zemoso.bc24minet.mapper;

import com.zemoso.bc24minet.dto.UserDTO;
import com.zemoso.bc24minet.entities.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDTO toDTO(User user);
}
