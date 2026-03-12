package com.STOCK.XCHANGE.Config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.Key;
import java.util.*;

@Service
public class Jwt {

    SecretKey key;
    public Jwt() throws Exception{
        KeyGenerator generator = KeyGenerator.getInstance("HmacSHA256");
        key = generator.generateKey();
    }

    public String generate(String username){
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000*60*60))
                .signWith(key)
                .compact();
    }

    public String extractusername(String token){
        Claims claims = extractClaims(token);
        return claims.getSubject();
    }

    public boolean valid(String token){
        Claims claims = extractClaims(token);
        return !claims.getExpiration().before(new Date(System.currentTimeMillis()));
    }

    public Claims extractClaims(String token){
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
