package com.STOCK.XCHANGE.Records;

import io.micrometer.common.lang.internal.Contract;

import java.util.List;

public class PortfolioGraphData{
        List<String> date;
        List<Double> totalInvested;
        List<Double> currentValue;

        public PortfolioGraphData(){}

    public PortfolioGraphData(List<Double> totalInveseted, List<String> date, List<Double> currentValue) {
        this.totalInvested = totalInveseted;
        this.date = date;
        this.currentValue = currentValue;
    }

    public List<Double> getTotalInvested() {
        return totalInvested;
    }

    public void setTotalInvested(List<Double> totalInveseted) {
        this.totalInvested = totalInveseted;
    }

    public List<Double> getCurrentValue() {
        return currentValue;
    }

    public void setCurrentValue(List<Double> currentValue) {
        this.currentValue = currentValue;
    }

    public List<String> getDate() {
        return date;
    }

    public void setDate(List<String> date) {
        this.date = date;
    }
}
