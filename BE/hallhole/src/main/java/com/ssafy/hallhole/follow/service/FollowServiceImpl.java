package com.ssafy.hallhole.follow.service;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.follow.domain.Follow;
import com.ssafy.hallhole.follow.dto.FollowInputDTO;
import com.ssafy.hallhole.follow.dto.FollowOutputDTO;
import com.ssafy.hallhole.follow.dto.PagingInputDTO;
import com.ssafy.hallhole.follow.repository.FollowRepositoryImpl;
import com.ssafy.hallhole.member.domain.Member;
import com.ssafy.hallhole.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {
    private final MemberRepository memberRepository;
    private final FollowRepositoryImpl followRepository;

    @Override
    public void addFollow(String following, String follower) throws NotFoundException {
        Member ing = memberRepository.findByIdTag(following);
        Member er = memberRepository.findByIdTag(follower);

        if(ing.isOut() || er.isOut() || ing==null || er==null || following.equals(follower)){
            throw new NotFoundException("유효하지 않은 계정입니다.");
        }
        if(followRepository.findRelationInMember(ing.getId(),er.getId()).size()!=0){
            throw new NotFoundException("이미 팔로우 한 계정입니다.");
        }

        Follow follow = new Follow(ing,er);
        followRepository.save(follow);

        ing.addFollowingCnt();
        er.addFollowerCnt();
        memberRepository.save(ing);
        memberRepository.save(er);
    }

    @Override
    public void delFollow(String following, String follower) throws NotFoundException {
        Member ing = memberRepository.findByIdTag(following);
        Member er = memberRepository.findByIdTag(follower);

        if(ing.isOut() || er.isOut() || ing==null || er==null || following.equals(follower)){
            throw new NotFoundException("유효하지 않은 계정입니다.");
        }
        List<Follow> delRelation = followRepository.findRelationInMember(ing.getId(), er.getId());
        if(delRelation.size()==0){
            throw new NotFoundException("팔로우하지 않은 계정입니다.");
        }

        followRepository.delete(delRelation.get(0));
        ing.subFollowingCnt();
        er.subFollowerCnt();
        memberRepository.save(ing);
        memberRepository.save(er);
    }

    @Override
    public List<FollowOutputDTO> findFollowing(PagingInputDTO inputDto) throws NotFoundException {

        Member member = memberRepository.findByIdTag(inputDto.getIdTag());
        if(member==null || member.isOut()) {
            throw new NotFoundException("유효한 사용자가 아닙니다.");
        }
        List<Follow> list = followRepository.findByFollowingMemberId(
                inputDto.getStart(), inputDto.getSize(), member.getId());
        List<FollowOutputDTO> followingList = new LinkedList<>();

        for(Follow f:list){
            Member follow = f.getFollowedMember();
            if(follow==null || follow.isOut()) continue;
            FollowOutputDTO dto = new FollowOutputDTO(follow.getName(), follow.getIdTag(),
                    follow.getNowBg(),follow.getNowChar(),follow.getNowAcc());
            followingList.add(dto);
        }

        return followingList;
    }

    @Override
    public List<FollowOutputDTO> findFollower(PagingInputDTO inputDto) throws NotFoundException {

        Member member = memberRepository.findByIdTag(inputDto.getIdTag());
        if(member==null || member.isOut()) {
            throw new NotFoundException("유효한 사용자가 아닙니다.");
        }

        List<Follow> list = followRepository.findByFollowedMemberId(
                inputDto.getStart(), inputDto.getSize(), member.getId());
        List<FollowOutputDTO> followerList = new LinkedList<>();

        for(Follow f:list){
            Member follow = f.getFollowingMember();
            if(follow==null || follow.isOut()) continue;
            FollowOutputDTO dto = new FollowOutputDTO(follow.getName(), follow.getIdTag(),
                    follow.getNowBg(),follow.getNowChar(),follow.getNowAcc());
            followerList.add(dto);
        }

        return followerList;
    }

    @Override
    public List<Follow> findRelation(FollowInputDTO inputDto) throws NotFoundException {

        Member ing = memberRepository.findByIdTag(inputDto.getFollowingTag());
        Member er = memberRepository.findByIdTag(inputDto.getFollowerTag());
        if(ing==null || er==null || ing.isOut() || er.isOut() || ing.getId()==er.getId()) {
            throw new NotFoundException("유효한 사용자가 아닙니다.");
        }

        List<Follow> relation = followRepository.findRelationInMember(ing.getId(), er.getId());

        return relation;
    }

}
