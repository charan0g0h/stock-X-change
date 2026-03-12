package com.STOCK.XCHANGE.Config;

import com.STOCK.XCHANGE.Entitys.UserProfile;
import com.STOCK.XCHANGE.Repositary.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDS implements UserDetailsService {
    @Autowired
    UserRepo repo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserProfile profile = repo.findByUsername(username);
        return User.builder()
                .username(profile.getUsername())
                .password(profile.getPassword())
                .roles("user")
                .build();
    }
}
