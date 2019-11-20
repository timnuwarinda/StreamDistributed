package com.stream.streaming.config;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtConfigurationUtility {

    @Value("${jwt.expiration}")
    public long JWT_TOKEN_VALIDITY;
    @Value("${app.jwtSecret}")
    private String secret;

    public String doGenerateToken(String broadcasterId) {
        return Jwts.builder()
                .setSubject(broadcasterId)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY ))
                .signWith(SignatureAlgorithm.HS256,secret).compact();
    }

    public Boolean validateToken(String token){
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true;
        }catch (Exception e){
            return false;
        }

    }
}


