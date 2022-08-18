package com.ssafy.hallhole.member.jwt;

import lombok.RequiredArgsConstructor;
import org.apache.http.Header;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;
import java.util.Map;


@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final TokenProvider tokenProvider;

    // 실제 필터링 로직은 doFilterInternal 에 들어감
    // JWT 토큰의 인증 정보를 현재 쓰레드의 SecurityContext 에 저장하는 역할 수행
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {

        System.out.println("JwtFilter의 doFilterInternal 시작");
        System.out.println("request.getServletPath() = " + request.getServletPath());

        // 1. Request Header 에서 토큰을 꺼냄
        String accessToken = resolveToken(request);

        if (accessToken == null) {
            System.out.println("JwtFilter의 doFilterInternal accessToken is null");
        } else {
            System.out.println("JwtFilter의 doFilterInternal accessToken accessToken = " + accessToken);
        }

        // 2. validateToken 으로 토큰 유효성 검사
        // 정상 토큰이면 해당 토큰으로 Authentication 을 가져와서 SecurityContext 에 저장
        if (StringUtils.hasText(accessToken) && tokenProvider.validateToken(accessToken)) {
            System.out.println("토큰 잘 들어오고, 유효한 토큰임");
            Authentication authentication = tokenProvider.getAuthentication(accessToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

    private String getHeader(@RequestHeader Map<String, Object> requestHeader){
        return (String) requestHeader.get("token");
    }

    // Request Header 에서 토큰 정보를 꺼내오기
    private String resolveToken(HttpServletRequest request) {

        System.out.println("JwtFilter의 resolveToken 시작");

        String accessToken = request.getHeader("token");
        System.out.println("JwtFilter의 resolveToken accessToken = " + accessToken);

        if(StringUtils.hasText(accessToken)){
            return accessToken;
        }

        return null;
    }
}
