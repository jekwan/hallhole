package com.ssafy.hallhole.follow.service;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.follow.domain.Follow;
import com.ssafy.hallhole.follow.dto.FollowInputDTO;
import com.ssafy.hallhole.follow.dto.FollowOutputDTO;

import java.util.List;

public interface FollowService {

    void addFollow(Long following, Long follower) throws NotFoundException;

    void delFollow(Long following, Long follower) throws NotFoundException;

    List<FollowOutputDTO> findFollowing(Long mId) throws NotFoundException;

    List<FollowOutputDTO> findFollower(Long mId) throws NotFoundException;

    Follow findRelation(FollowInputDTO inputDto) throws NotFoundException;
}
