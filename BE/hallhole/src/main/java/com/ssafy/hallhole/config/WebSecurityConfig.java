package com.ssafy.hallhole.config;

import com.ssafy.hallhole.member.jwt.JwtAccessDeniedHandler;
import com.ssafy.hallhole.member.jwt.JwtAuthenticationEntryPoint;
import com.ssafy.hallhole.member.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final TokenProvider jwtTokenService;

    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    private static final String[] PERMIT_URL_ARRAY = {
            /* swagger v2 */
            "/v2/api-docs",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",
            /* swagger v3 */
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/member/join",
            "/member/login",
            "/",
            "/index",
            "/**/*.woff",
            "/**/*.ttf",
            "/**/favicon.ico",
            "/performance/images",
            "/main",
            "/review/reviewdetail/**",
            "/editprofile/**"
    };

    @Override
    public void configure(WebSecurity web){ // 보안 예외처리(HTML, 정적리소스)
        web.ignoring()
                .antMatchers("/resources/**","/char/**", "/acc/**", "/index_bundle.js","/**/*.css", "/**/*.png", "/**/*.jpg",
                        "/**/*.gif","/**/*.woff", "/**/*.ttf","/performance/images","/member/join","/review/reviewdetail/**","/editprofile/**",
                        "/member/login","/**/favicon.ico");
        web.ignoring().antMatchers(PERMIT_URL_ARRAY);
        web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception { // 보안처리

        http.csrf().disable();

        // 일반적인 루트가 아닌 다른 방식으로 요청시 거절, header에 id, pw가 아닌 token(jwt)을 달고 간다.
        // 그래서 basic이 아닌 bearer를 사용한다.
        http.httpBasic().disable() // 요청에 대한 사용권한 체크
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                // 시큐리티는 기본적으로 세션을 사용
                // 여기서는 세션을 사용하지 않기 때문에 세션 설정을 Stateless 로 설정
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                // 로그인, 회원가입 API 는 토큰이 없는 상태에서 요청이 들어오기 때문에 permitAll 설정
                .and()
                .authorizeRequests()
//                .antMatchers("/member/**", "/comment/**","/facility/**","/follow/**","/item/**","/performance/**","/plike/**","/report/**",
//                        "/review/**","/review-reaction/**","/twitter/**","/ws/**","/profile/**").hasRole("USER")
//                .antMatchers(PERMIT_URL_ARRAY).permitAll()
                .antMatchers("/**").permitAll()
//                .anyRequest().authenticated()   // 나머지 API 는 전부 인증 필요

                // JwtFilter 를 addFilterBefore 로 등록했던 JwtSecurityConfig 클래스를 적용
                .and()
                .apply(new JwtSecurityConfig(tokenProvider));

    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
