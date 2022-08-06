package com.ssafy.hallhole.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberJoinDTO {

    private String email;

    private String name;

    private String pw;

}
