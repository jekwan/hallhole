package com.ssafy.hallhole.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class tokenInputDTO {

    Long userId;

    String sessionId;

}
