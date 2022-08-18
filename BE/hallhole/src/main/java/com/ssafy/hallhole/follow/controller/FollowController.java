package com.ssafy.hallhole.follow.controller;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.follow.domain.Follow;
import com.ssafy.hallhole.follow.dto.FollowInputDTO;
import com.ssafy.hallhole.follow.dto.FollowOutputDTO;
import com.ssafy.hallhole.follow.dto.PagingInputDTO;
import com.ssafy.hallhole.follow.service.FollowServiceImpl;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/follow")
@RequiredArgsConstructor
@ApiOperation(value = "followController")
public class FollowController {

    private final FollowServiceImpl followService;

    @PostMapping
    @ApiOperation(value="팔로우 하기 following -> follower",
            notes = "ing이 팔로우 버튼 누른 사람. er가 팔로우 당한 사람")
    public void addFollow(@RequestBody FollowInputDTO dto) throws NotFoundException {
        followService.addFollow(dto.getFollowingTag(),dto.getFollowerTag());
    }

    @DeleteMapping
    @ApiOperation(value="팔로우 취소 following -> follower",
            notes = "ing이 팔로우 버튼 누른 사람. er가 팔로우 당한 사람")
    public void delFollow(@RequestBody FollowInputDTO dto) throws NotFoundException {
        followService.delFollow(dto.getFollowingTag(),dto.getFollowerTag());
    }

    @PostMapping("/following")
    @ApiOperation(value="아이디 태그로 팔로우를 누른사람 보기",
            notes = "태그아이디가 팔로우를 누른사람 보기 (해당 아이디의 팔로잉 목록 보기)")
    public List<FollowOutputDTO> getFollowing(@RequestBody PagingInputDTO inputDto) throws NotFoundException {
        return followService.findFollowing(inputDto);
    }


    @PostMapping("/follower")
    @ApiOperation(value="아이디 태그로 팔로워 보기",
            notes = "태그아이디를 팔로우 한 사람들 목록 보기 (해당 아이디의 팔로워 목록 보기)")
    public List<FollowOutputDTO> getFollower(@RequestBody PagingInputDTO inputDto) throws NotFoundException {
        return followService.findFollower(inputDto);
    }



    @PostMapping("/chk-follow")
    @ApiOperation(value="팔로우 관계인지 알아보기 >> input: followingTag, followerTag",
            notes = "팔로잉이 팔로워를 팔로우 했는지 알아보기")
    public boolean findRelation(@RequestBody FollowInputDTO inputDto) throws NotFoundException {
        List<Follow> relation = followService.findRelation(inputDto);
        if(relation.size()==0) return false;
        return true;
    }


}
