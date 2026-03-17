package com.STOCK.XCHANGE.Records;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record FetchData(
        String companyName,
        CurrentPrice currentPrice
) {
}
