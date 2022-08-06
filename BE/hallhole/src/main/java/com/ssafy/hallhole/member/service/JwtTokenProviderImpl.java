package com.ssafy.hallhole.member.service;

import com.ssafy.hallhole.member.domain.Member;
import com.ssafy.hallhole.member.dto.TokenDto;
import com.ssafy.hallhole.member.repository.MemberRepository;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.SchemaOutputResolver;
import java.util.Base64;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class JwtTokenProviderImpl implements JwtTokenProvider {

    @Value("${secretKey}")
    private String secretKey = "";

    // 토큰 유효시간 60분
    private long tokenValidTime = 60 * 60 * 1000L;
    private final CustomUserDetailService userDetailsService;
    private final MemberRepository memberRepository;

    // 객체 초기화, secretKey를 Base64로 인코딩한다.
    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    // JWT 토큰 생성
    @Override
    public String createToken(Long userId, String sessionId) {
        Member member = memberRepository.findById(userId).get();
        Claims claims = Jwts.claims().setSubject("userInfo"); // JWT payload 에 저장되는 정보단위
        claims.put("userId", Long.toString(userId));
        claims.put("sessionId",sessionId);
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims) // 정보 저장
                .setExpiration(new Date(now.getTime() + tokenValidTime)) // set Expire Time
                .signWith(SignatureAlgorithm.HS256, secretKey)  // jwt 암호화, 서명
                .compact(); // 압축+서명
    }

    // JWT 토큰에서 인증 정보 조회
    @Override
    public Authentication getAuthentication(String token) {
        Claims test = this.getAllclaimsFromToken(token);
        String userId = test.get("userId").toString();
        String sessionId = test.get("sessionId").toString();
        UserDetails userDetails = userDetailsService.loadUserByUsername(userId);
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    // 토큰에서 회원 정보 추출
    @Override
    public String getUserPk(String token) {
        return Jwts.parser().setSigningKey(secretKey).
                parseClaimsJws(token).getBody().getSubject();
    }

    public Claims getAllclaimsFromToken(String token){
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }

    // Request의 Header에서 token 값을 가져옵니다. "token" : "TOKEN값"
    @Override
    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("token");
    }

    // 토큰의 유효성 + 만료일자 확인
    public boolean validateToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (SignatureException e){
            System.out.println("Invalid JWT signature");
        } catch (IllegalArgumentException ex) {
            System.out.println("JWT claims string is empty.");
        }
        return false;
    }
}
