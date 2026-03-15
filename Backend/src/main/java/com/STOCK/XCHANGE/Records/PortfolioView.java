package com.STOCK.XCHANGE.Records;

public record PortfolioView(
        double totalInvested ,
        double CurrentHoldingsQuantity,
        double closedProfitLoss,
        double closedAmount,
        double closedProfitLossPercent
) {
}
