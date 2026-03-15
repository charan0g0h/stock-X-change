package com.STOCK.XCHANGE.Entitys;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Stock {
    @Id
            @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    @Column(
            unique = true
    )
    String tickerid;
    String company_name;
    Double quantity;
    @ManyToOne
            @JoinColumn(
                    name= "profile_id"
            )
            @JsonBackReference
    UserProfile userProfile;

    public UserProfile getUserProfile() {
        return userProfile;
    }

    public void setUserProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
    }

    @OneToMany(
            mappedBy = "stock",
            cascade = CascadeType.ALL
    )
            @JsonManagedReference
    List<Transactions> transactions;

    public List<Transactions> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<Transactions> transactions) {
        this.transactions = transactions;
    }

    public Stock(){}

    public Stock(String ticker_id, String company_name, Double quantity, int id) {
        this.tickerid = ticker_id;
        this.company_name = company_name;
        this.quantity = quantity;
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTicker_id() {
        return tickerid;
    }

    public void setTicker_id(String ticker_id) {
        this.tickerid = ticker_id;
    }

    public String getCompany_name() {
        return company_name;
    }

    public void setCompany_name(String company_name) {
        this.company_name = company_name;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }
}
