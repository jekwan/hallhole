package com.ssafy.hallhole.member.dto;

import com.ssafy.hallhole.member.domain.Authority;
import com.ssafy.hallhole.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LoginDTO {

   private String email;

   private String pw;

   public Member toMember(PasswordEncoder passwordEncoder) {
      return Member.builder()
              .email(email)
              .password(passwordEncoder.encode(pw))
              .authority(Authority.ROLE_USER)
              .build();
   }

   public UsernamePasswordAuthenticationToken toAuthentication() {
      return new UsernamePasswordAuthenticationToken(email, pw);
   }

}
