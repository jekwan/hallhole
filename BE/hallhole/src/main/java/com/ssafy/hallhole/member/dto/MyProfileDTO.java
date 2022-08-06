package com.ssafy.hallhole.member.dto;

import com.ssafy.hallhole.member.domain.Gender;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MyProfileDTO {

    private Long id;

    private String name;

    private String email;

    private Gender gender;

    private LocalDate birth;

    private String profile;

    private int nowBg;

    private int nowChar;

    private int nowAcc;

}
