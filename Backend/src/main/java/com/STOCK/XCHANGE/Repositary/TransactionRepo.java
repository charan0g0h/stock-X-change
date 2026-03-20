package com.STOCK.XCHANGE.Repositary;

import com.STOCK.XCHANGE.Entitys.Stock;
import com.STOCK.XCHANGE.Entitys.Transactions;
import com.STOCK.XCHANGE.Entitys.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepo extends JpaRepository<Transactions,Integer> {
    public List<Transactions> findAllByStock(Stock stock );


}
