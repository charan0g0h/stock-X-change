package com.STOCK.XCHANGE.Controller;

import com.STOCK.XCHANGE.Entitys.Stock;
import com.STOCK.XCHANGE.Entitys.Transactions;
import com.STOCK.XCHANGE.Entitys.UserProfile;
import com.STOCK.XCHANGE.Records.BuyStock;
import com.STOCK.XCHANGE.Records.InvestedStock;
import com.STOCK.XCHANGE.Repositary.StockRepo;
import com.STOCK.XCHANGE.Repositary.TransactionRepo;
import com.STOCK.XCHANGE.Repositary.UserRepo;
import com.STOCK.XCHANGE.Records.ViewStock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.List;

@RestController
public class StockController {
    @Autowired
    StockRepo stockRepo;
    @Autowired
    TransactionRepo transactionRepo;
    @Autowired
    UserRepo userRepo;
    Authentication authentication ;


    @PostMapping("/buy")
    public void buy(
            @RequestBody BuyStock buyStock
            ){
        authentication = SecurityContextHolder.getContext().getAuthentication();
        UserProfile profile = null;
        if(authentication != null){
           profile = userRepo.findByUsername(authentication.getName());
            Stock stock = stockRepo.findByTickerid(buyStock.tickerid());
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
            profile.setBalance(profile.getBalance() - buyStock.buy_price());
            transactions.setPrice(buyStock.buy_price());
            Double total = stock.getQuantity() + buyStock.quantity();
            stock.setQuantity(total);
            userRepo.save(profile);
            stockRepo.save(stock);
            transactionRepo.save(transactions);
        }
    }

    @PostMapping("/sell")
    public void sell(
            @RequestBody InvestedStock investedStock
            ){
        authentication = SecurityContextHolder.getContext().getAuthentication();
        UserProfile profile = null;
        Stock stock = stockRepo.findByTickerid(investedStock.tickerid());
        if(stock != null && stock.getQuantity() >= investedStock.quantity()){
            Transactions transactions = new Transactions();
            transactions.setPrice(investedStock.price());
            transactions.setStock(stock);
            transactions.setQuantity(investedStock.quantity());
            transactions.setTransaction_type("SELL");
            if(authentication != null){
                profile = userRepo.findByUsername(authentication.getName());
            }
            profile.setBalance(profile.getBalance() + investedStock.quantity());
            transactionRepo.save(transactions);
            userRepo.save(profile);
            double total = stock.getQuantity() - investedStock.quantity();
            stock.setQuantity(total);
            if(stock.getQuantity() == 0.0){
                stockRepo.delete(stock);
            }
            stockRepo.save(stock);
        }
    }
    @GetMapping("/myStock")
    public List<ViewStock> mystock(){
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

    @GetMapping("allStocks")
    public List<ViewStock> viewAll(){
        List<Stock> stocks = stockRepo.findAll();
        List<ViewStock> viewStocks = new LinkedList<>();
        for(Stock e : stocks){
            ViewStock viewStock = new ViewStock(e.getTicker_id(),e.getQuantity(),e.getCompany_name());
            viewStocks.add(viewStock);
        }
        return viewStocks;
    }
}
