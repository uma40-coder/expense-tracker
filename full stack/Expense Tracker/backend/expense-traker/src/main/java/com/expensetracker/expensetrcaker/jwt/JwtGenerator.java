package com.expensetracker.expensetrcaker.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JwtGenerator {

    private static final String SECRET =
            "MyVerySecretKeyMyVerySecretKey12345";

    public static void main(String[] args) {

        String token = Jwts.builder()
                .subject("john")
                .claim("role", "ADMIN")
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 600000))
                .signWith(
                    io.jsonwebtoken.security.Keys.hmacShaKeyFor(
                        SECRET.getBytes()))
                .compact();

        System.out.println(token);
    }
}