package com.STOCK.XCHANGE.Repositary;

import com.STOCK.XCHANGE.Entitys.Stock;
import com.STOCK.XCHANGE.Entitys.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockRepo extends JpaRepository<Stock,Integer> {
    public Stock findByTickerid(String tickerid);
    public Stock findByTickeridAndUserProfile(String tickerid , UserProfile userProfile);
}
