package com.STOCK.XCHANGE.Controller;

import com.STOCK.XCHANGE.Entitys.Stock;
import com.STOCK.XCHANGE.Entitys.Transactions;
import com.STOCK.XCHANGE.Entitys.UserProfile;
import com.STOCK.XCHANGE.Records.*;
import com.STOCK.XCHANGE.Repositary.StockRepo;
import com.STOCK.XCHANGE.Repositary.TransactionRepo;
import com.STOCK.XCHANGE.Repositary.UserRepo;
import com.STOCK.XCHANGE.Service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@RestController
public class StockController {
    @Autowired
    StockRepo stockRepo;
    @Autowired
    TransactionRepo transactionRepo;
    @Autowired
    UserRepo userRepo;
    Authentication authentication ;
    @Autowired
    StockService stockService;


    @PostMapping("/buy")
    public void buy(
            @RequestBody BuyStock buyStock
            ){
        stockService.buy(buyStock);
    }

    @PostMapping("/sell")
    public void sell(
            @RequestBody InvestedStock investedStock
            ){
        stockService.sell(investedStock);
    }
    @GetMapping("/myStock")
    public List<ViewStock> mystock(){
       return stockService.mystock();
    }

    @GetMapping("/getStockdata")
    public Map getStockData(){
        return stockService.getStockData();
    }
    @GetMapping("/portfolioSummary")
    public PortfolioGraphData getPortfolioSummary(){
        return stockService.getPortfolioSummary();
    }
}
