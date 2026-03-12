package com.STOCK.XCHANGE.Controller;

import com.STOCK.XCHANGE.Config.Jwt;
import com.STOCK.XCHANGE.Entitys.UserProfile;
import com.STOCK.XCHANGE.Records.UsernamePassword;
import com.STOCK.XCHANGE.Repositary.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    @Autowired
    UserRepo userRepo;
    @Autowired
    Jwt jwt;
    @Autowired
    AuthenticationManager manager;

    @PostMapping("/register")
    public void register(
            @RequestBody UsernamePassword usernamePassword
            ){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
        UserProfile userProfile = new UserProfile();
        userProfile.setUsername(usernamePassword.username());
        userProfile.setPassword(encoder.encode(usernamePassword.password()));
        userRepo.save(userProfile);
    }
    @PostMapping("/login")
    public String login(
            @RequestBody UsernamePassword usernamePassword
    ){
        Authentication authentication = manager.authenticate(new UsernamePasswordAuthenticationToken(
                usernamePassword.username(),
                usernamePassword.password(),
                null
        ));
        if(authentication.isAuthenticated()){
            return jwt.generate(usernamePassword.username());
        }
        return "incorrect creds";
    }
}
