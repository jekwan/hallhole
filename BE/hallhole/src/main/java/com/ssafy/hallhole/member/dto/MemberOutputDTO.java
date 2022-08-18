package com.ssafy.hallhole.member.dto;

import com.ssafy.hallhole.member.domain.Gender;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberOutputDTO {

    private String name;

    private String email;

    private Gender gender;

    private LocalDate birth;

    private boolean isAdmin;

    private int point;

    private boolean isOut;

    private String idTag;

    private boolean isBan;

    private int followingCnt;

    private int followerCnt;

    private String profile;

    private int nowBg = 0;

    private int nowChar = 0;

    private int nowAcc = 0;
}
