package com.ssafy.hallhole.follow.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FollowInputDTO {

    private Long followingId;
    private Long followerId;

}
