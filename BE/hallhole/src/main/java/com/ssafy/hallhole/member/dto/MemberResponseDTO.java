package com.ssafy.hallhole.member.dto;

import com.ssafy.hallhole.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberResponseDTO {

    private String email;

    public static MemberResponseDTO of(Member member) {
        return new MemberResponseDTO(member.getEmail());
    }
}