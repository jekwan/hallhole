package com.ssafy.hallhole.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SessionDTO {

    String sessionId;

    @Setter
    Date expireDate;

}
