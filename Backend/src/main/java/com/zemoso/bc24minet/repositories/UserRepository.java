package com.zemoso.bc24minet.repositories;

import com.zemoso.bc24minet.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;

@Repository
public interface UserRepository extends JpaRepository<User, BigInteger> {


}
