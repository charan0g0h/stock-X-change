package com.STOCK.XCHANGE.Entitys;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
public class Transactions {
    @Id
            @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    String transaction_type;
    double quantity;
    double price;
    String date;
    @ManyToOne
            @JoinColumn(
                    name = "stock_id"
            )
            @JsonBackReference
    Stock stock;
    public Transactions(){
        LocalDate localDate = LocalDate.now();
        this.date = localDate.toString();
    }

    public Transactions(int id, String transaction_type, double quantity, double buy_price) {
        this.id = id;
        this.transaction_type = transaction_type;
        this.quantity = quantity;
        this.price = buy_price;
        LocalDate localDate = LocalDate.now();
        this.date = localDate.toString();
    }

    public Stock getStock() {
        return stock;
    }

    public void setStock(Stock stock) {
        this.stock = stock;
    }

    public String getDate() {
        return date;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTransaction_type() {
        return transaction_type;
    }

    public void setTransaction_type(String transaction_type) {
        this.transaction_type = transaction_type;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
