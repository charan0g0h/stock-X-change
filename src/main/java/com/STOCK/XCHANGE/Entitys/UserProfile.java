package com.STOCK.XCHANGE.Entitys;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    String username;
    @Column(
            unique = true
    )
    String email;
    String password;
    double balance;
    public UserProfile(){}
    @OneToMany(
            mappedBy = "userProfile",
            cascade = CascadeType.ALL
    )
    @JsonManagedReference
    public List<Stock> stock;
    public UserProfile(int id, String username, String email, String password, double balance) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.balance = balance;
    }

    public List<Stock> getStock() {
        return stock;
    }
    public void setStock(List<Stock> stock) {
        this.stock = stock;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }
}
