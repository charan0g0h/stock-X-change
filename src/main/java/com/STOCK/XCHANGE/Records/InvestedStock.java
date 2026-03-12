package com.STOCK.XCHANGE.Records;

public record InvestedStock(
        String tickerid,
        String company,
        double quantity,
        double price
) {
}
