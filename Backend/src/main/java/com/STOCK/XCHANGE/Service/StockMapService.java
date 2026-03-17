package com.STOCK.XCHANGE.Service;

import com.STOCK.XCHANGE.Records.FetchData;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class StockMapService {
    Map<String, FetchData> StockMap  = new HashMap<>();
    public FetchData getData(String companyName){
        return StockMap.get(companyName);
    }
}
