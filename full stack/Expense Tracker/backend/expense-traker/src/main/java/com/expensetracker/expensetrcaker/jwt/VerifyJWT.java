package com.expensetracker.expensetrcaker.jwt;

import io.jsonwebtoken.Jwts;

public class VerifyJWT {

    private static final String SECRET =
            "MyVerySecretKeyMyVerySecretKey12345";

    public static void main(String[] args) {

        String token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzg0MDAzODY3LCJleHAiOjE3ODQwMDQ0Njd9.ZJPtD22DpBOHlUtgosONswm450w6IFURHWs5d5BX6VM";

        var claims = Jwts.parser()
                .verifyWith(
                  io.jsonwebtoken.security.Keys
                  .hmacShaKeyFor(SECRET.getBytes()))
                .build()
                .parseSignedClaims(token);

        System.out.println(claims.getPayload().getSubject());
        System.out.println(claims.getPayload().get("role"));
    }
}