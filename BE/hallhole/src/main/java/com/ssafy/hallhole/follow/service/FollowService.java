package com.ssafy.hallhole.follow.service;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.follow.domain.Follow;
import com.ssafy.hallhole.follow.dto.FollowInputDTO;
import com.ssafy.hallhole.follow.dto.FollowOutputDTO;
import com.ssafy.hallhole.follow.dto.PagingInputDTO;

import java.util.List;

public interface FollowService {

    void addFollow(String following, String follower) throws NotFoundException;

    void delFollow(String following, String follower) throws NotFoundException;

    List<FollowOutputDTO> findFollowing(PagingInputDTO inputDto) throws NotFoundException;

    List<FollowOutputDTO> findFollower(PagingInputDTO inputDto) throws NotFoundException;

    List<Follow> findRelation(FollowInputDTO inputDto) throws NotFoundException;
}
