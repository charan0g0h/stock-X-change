package com.STOCK.XCHANGE.Records;

import com.STOCK.XCHANGE.Entitys.Stock;

import java.util.List;

public record UserProfile(
        String username,
        String email,
        Double balance,
        List<Stock> stocks
) {
}
