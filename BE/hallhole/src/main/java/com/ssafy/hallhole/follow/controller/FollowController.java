package com.ssafy.hallhole.follow.controller;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.follow.domain.Follow;
import com.ssafy.hallhole.follow.dto.FollowInputDTO;
import com.ssafy.hallhole.follow.dto.FollowOutputDTO;
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
    @ApiOperation(value="[완료] 팔로우 하기 following -> follower")
    public ResponseEntity addFollow(@RequestBody FollowInputDTO dto){
        try{
            followService.addFollow(dto.getFollowingId(),dto.getFollowerId());
            return new ResponseEntity(HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping
    @ApiOperation(value="[완료] 팔로우 취소 following -> follower")
    public ResponseEntity delFollow(@RequestBody FollowInputDTO dto){
        try{
            followService.delFollow(dto.getFollowingId(),dto.getFollowerId());
            return new ResponseEntity(HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/following")
    @ApiOperation(value="[완료] 내 ID로 내가 팔로잉 중인 사용자 찾기 >> input: followingId")
    public ResponseEntity<FollowOutputDTO> getFollowing(@RequestBody FollowInputDTO inputDto){
        try{
            List<FollowOutputDTO> followingList = followService.findFollowing(inputDto.getFollowingId());
            return new ResponseEntity(followingList, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/follower")
    @ApiOperation(value="[완료] 내 ID로 나를 팔로잉 중인 사용자 찾기 >> input: followerId")
    public ResponseEntity<FollowOutputDTO> getFollower(@RequestBody FollowInputDTO inputDto){
        try{
            List<FollowOutputDTO> followerList = followService.findFollower(inputDto.getFollowerId());
            return new ResponseEntity(followerList, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/chk-follow")
    @ApiOperation(value="[완료] 팔로우 관계인지 알아보기 >> input: followingId, followerId")
    public Follow findRelation(@RequestBody FollowInputDTO inputDto) throws NotFoundException {
        Follow relation = followService.findRelation(inputDto);
        return relation;
    }


}
