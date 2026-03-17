package com.STOCK.XCHANGE.Records;

public record PortfolioView(
        double totalInvested ,
        double CurrentHoldingsQuantity,
        double closedProfitLoss,
        double closedAmount,
        double avgBuyPrice,
        double currentValue,
        double returns,
        double currentPrice,
        double yearHigh,
        double yearLow
) {
}
