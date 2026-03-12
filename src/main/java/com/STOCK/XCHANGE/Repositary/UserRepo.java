package com.STOCK.XCHANGE.Repositary;

import com.STOCK.XCHANGE.Entitys.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<UserProfile,Integer> {
    public UserProfile findByUsername(String username);
}
