package com.STOCK.XCHANGE.Records;

public record ViewStock(
        String tickerid,
        double quantity,
        String company_name
) {
}
