package com.ssafy.hallhole.member.jwt;

import com.ssafy.hallhole.member.service.CustomUserDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthenticationProviderImpl implements AuthenticationProvider {

    private final CustomUserDetailService userDetailsService;
    private final PasswordEncoder passwordEncoder;

    /**
     * 인증 구현
     */
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        System.out.println("AuthenticationProviderImpl의 authenticate 시작");

        // 전달 받은 UsernamePasswordAuthenticationToken
        System.out.println("전달 받은 UsernamePasswordAuthenticationToken");
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) authentication;

        // AuthenticaionFilter에서 생성된 토큰으로부터 아이디와 비밀번호를 추출
        System.out.println("AuthenticaionFilter에서 생성된 토큰으로부터 아이디와 비밀번호를 추출");
        String username = token.getName();
        System.out.println("username = " + username);
        String password = (String) token.getCredentials();
        System.out.println("password = " + password);

        // 해당 회원 Database 조회
        System.out.println("해당 회원 db 조회");
        UserDetails userDetail = userDetailsService.loadUserByUsername(username);

        // 비밀번호 확인
        System.out.println("비밀번호 확인");
        if (!passwordEncoder.matches(password, userDetail.getPassword()))
            throw new BadCredentialsException(userDetail.getUsername() + "Invalid password");

        // 인증 성공 시 UsernamePasswordAuthenticationToken 반환
        System.out.println("인증 성공 시 UsernamePasswordAuthenticationToken 반환");
        return new UsernamePasswordAuthenticationToken(userDetail.getUsername(), "", userDetail.getAuthorities());
    }

    /**
     * provider의 동작 여부를 설정
     */
    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }

}