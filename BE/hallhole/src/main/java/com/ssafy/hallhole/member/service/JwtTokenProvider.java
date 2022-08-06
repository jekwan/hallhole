package com.ssafy.hallhole.member.service;

import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;

public interface JwtTokenProvider {

    String createToken(Long userPk, String sessionId);

    Authentication getAuthentication(String token);
//
    String getUserPk(String token);
//
    String resolveToken(HttpServletRequest request);


}
