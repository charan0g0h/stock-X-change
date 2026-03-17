package com.STOCK.XCHANGE.Service;

import com.STOCK.XCHANGE.Entitys.Stock;
import com.STOCK.XCHANGE.Entitys.Transactions;
import com.STOCK.XCHANGE.Entitys.UserProfile;
import com.STOCK.XCHANGE.Records.*;
import com.STOCK.XCHANGE.Repositary.StockRepo;
import com.STOCK.XCHANGE.Repositary.TransactionRepo;
import com.STOCK.XCHANGE.Repositary.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@Service
public class StockService {
    Authentication authentication;
    @Autowired
    UserRepo userRepo;
    @Autowired
    StockRepo stockRepo;
    @Autowired
    TransactionRepo transactionRepo;
    @Autowired
    FetchStockService fetchService;
    @Autowired
    StockMapService mapService;
    @Transactional
    public void buy(BuyStock buyStock) {
        authentication = SecurityContextHolder.getContext().getAuthentication();
        UserProfile profile = null;
        if(authentication != null && authentication.isAuthenticated()){
            profile = userRepo.findByUsername(authentication.getName());
            Stock stock = stockRepo.findByTickeridAndUserProfile(buyStock.tickerid(),profile);
            if(stock == null){

                stock = new Stock();
                stock.setTicker_id(buyStock.tickerid());
                stock.setCompany_name(buyStock.company_name());
                stock.setQuantity(0.0);
                stock.setUserProfile(profile);
                stockRepo.save(stock);
            }
            Transactions transactions = new Transactions();
            transactions.setTransaction_type("BUY");
            transactions.setStock(stock);
            transactions.setQuantity(buyStock.quantity());
            profile.setBalance(profile.getBalance() - buyStock.buy_price()* buyStock.quantity());
            transactions.setPrice(buyStock.buy_price());
            double total = stock.getQuantity() + buyStock.quantity();
            stock.setQuantity(total);
            transactionRepo.save(transactions);
            stockRepo.save(stock);
            userRepo.save(profile);
        }
    }

    @Transactional
    public void sell(InvestedStock investedStock) {

        authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {

            UserProfile profile = userRepo.findByUsername(authentication.getName());

            Stock stock = stockRepo.findByTickeridAndUserProfile(
                    investedStock.tickerid(),
                    profile
            );

            if (stock != null && stock.getQuantity() >= investedStock.quantity()) {

                Transactions transactions = new Transactions();
                transactions.setPrice(investedStock.price());   // price per stock
                transactions.setStock(stock);
                transactions.setQuantity(investedStock.quantity());
                transactions.setTransaction_type("SELL");

                double totalSellValue = investedStock.price() * investedStock.quantity();

                profile.setBalance(profile.getBalance() + totalSellValue);

                double remaining = stock.getQuantity() - investedStock.quantity();
                stock.setQuantity(remaining);

                transactionRepo.save(transactions);
                userRepo.save(profile);

                if (remaining == 0.0) {
                    stockRepo.delete(stock);
                } else {
                    stockRepo.save(stock);
                }
            }
        }
    }

    public List<ViewStock> mystock() {
        authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null){
            UserProfile profile = userRepo.findByUsername(authentication.getName());
            List<Stock> stk = profile.getStock();
            List<ViewStock> list = new LinkedList<>();
            for(Stock e : stk){
                ViewStock viewStock = new ViewStock(e.getTicker_id(),e.getQuantity(),e.getCompany_name());
                list.add(viewStock);
            }
            return list;
        }
        return  null;
    }

    public Map getStockData() {
        Map<String, PortfolioView> map = new HashMap<>();
        authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null){
            UserProfile userProfile = userRepo.findByUsername(authentication.getName());
            List<Stock> stockList = userProfile.getStock();
            for( Stock e : stockList){
                List<Transactions> transactionsList = e.getTransactions();
                FetchData data = mapService.getData(e.getCompany_name());
                if(data == null){
                    data = fetchService.getCompanydata(e.getCompany_name());
                }
                if(data.currentPrice() != null) {
                    double currentPrice = data.currentPrice().nse();
                    double currentQuantity = 0;
                    double currentValue;
                    double closedProfitLoss = 0;
                    double totalBuyPrice = 0;
                    double buyFrequency = 0;
                    double closedAmount = 0;
                    for (Transactions t : transactionsList) {
                        if (t.getTransaction_type().equals("BUY")) {
                            currentQuantity += t.getQuantity();
                            totalBuyPrice += t.getPrice()*t.getQuantity();
                            buyFrequency += t.getQuantity();
                        } else {
                            double avgBuyprice = totalBuyPrice / buyFrequency;
                            closedProfitLoss += t.getQuantity() * (t.getPrice() - avgBuyprice);
                            currentQuantity -= t.getQuantity();
                            closedAmount += t.getQuantity() * t.getPrice();
                            totalBuyPrice -= avgBuyprice * t.getQuantity();
                            buyFrequency -= t.getQuantity();
                        }
                    }
                    double avgBuyprice = (totalBuyPrice / buyFrequency);
                    double totalInvested = (currentQuantity * avgBuyprice);
                    currentValue = currentQuantity * currentPrice;
                    double returns = currentValue - totalInvested;
                    PortfolioView pv = new PortfolioView(totalInvested,
                            currentQuantity,
                            closedProfitLoss,
                            closedAmount,
                            avgBuyprice,
                            currentValue,
                            returns,
                            currentPrice,
                            data.yearHigh(),
                            data.yearLow());
                    map.put(e.getCompany_name(), pv);
                }
            }
        }
        return  map;
    }
}
