package com.STOCK.XCHANGE.Records;

import com.fasterxml.jackson.annotation.JsonProperty;

public record CurrentPrice(
        @JsonProperty("NSE")
        double nse,
        @JsonProperty("BSE")
        double bse
) {
}
