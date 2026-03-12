package com.STOCK.XCHANGE.Records;

public record BuyStock(
        String tickerid,
        String company_name,
        Double quantity,
        Double buy_price
) {
}
