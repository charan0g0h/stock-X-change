package com.STOCK.XCHANGE.Config;

import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@Configuration
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    Jwt jwt ;
    @Autowired
    UserDS userDS;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authhead = request.getHeader("Authorization");
        String token = null;
        if(authhead != null && authhead.startsWith("Bearer ")){
            token = authhead.substring(7);
        }
        String username = null;
        if(token != null){
            username = jwt.extractusername(token);
        }
        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){
            UserDetails User = userDS.loadUserByUsername(username);
            System.out.println("x");
            if(jwt.valid(token)){
                System.out.println("y");
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                        new UsernamePasswordAuthenticationToken(User,null,User.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }
        System.out.println(SecurityContextHolder.getContext().getAuthentication());
        filterChain.doFilter(request,response);
    }
}
