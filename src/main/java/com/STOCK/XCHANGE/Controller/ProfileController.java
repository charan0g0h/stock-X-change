package com.STOCK.XCHANGE.Controller;

import com.STOCK.XCHANGE.Config.Jwt;
import com.STOCK.XCHANGE.Records.UserProfile;
import com.STOCK.XCHANGE.Repositary.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Map;

@RestController
public class ProfileController {
    @Autowired
    UserRepo userRepo ;
    Authentication authentication;
    @Autowired
    Jwt jwt;

    @GetMapping("/getUser")
    public UserProfile getProfile(){
        authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null){
        com.STOCK.XCHANGE.Entitys.UserProfile  userProfile = userRepo.findByUsername(authentication.getName());
        UserProfile userProfile1 = new UserProfile(userProfile.getUsername(), userProfile.getEmail(), userProfile.getBalance(), userProfile.getStock());
        return userProfile1;
        }
        return null;
    }

}
