package com.STOCK.XCHANGE.Service;

import com.STOCK.XCHANGE.Records.FetchData;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class FetchStockService {
    public FetchData getCompanydata(String cname){
        String url = "https://stock.indianapi.in/stock?name=" + cname;
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("x-api-key","");
        HttpEntity<FetchData> entity = new HttpEntity<>(headers);
        ResponseEntity<FetchData> response = restTemplate.exchange(url, HttpMethod.GET,entity, FetchData.class);
        return response.getBody();
    }
}
