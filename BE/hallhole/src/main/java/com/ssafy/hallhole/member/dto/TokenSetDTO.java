package com.ssafy.hallhole.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TokenSetDTO {

    private String accessToken;

    private String refreshToken;

}
