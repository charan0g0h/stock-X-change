package com.STOCK.XCHANGE.Records;

public class Holding{
        double totalInvested;
        double quantity;
        public Holding(){

        }

    public Holding(double totalInvested, double quantity) {
        this.totalInvested = totalInvested;
        this.quantity = quantity;
    }

    public double getTotalInvested() {
        return totalInvested;
    }

    public void setTotalInvested(double totalInvested) {
        this.totalInvested = totalInvested;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }
}
