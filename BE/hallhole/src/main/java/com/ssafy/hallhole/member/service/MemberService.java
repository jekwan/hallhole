package com.ssafy.hallhole.member.service;

import com.ssafy.hallhole.advice.exceptions.BadRequestException;
import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.member.domain.Member;
import com.ssafy.hallhole.member.dto.*;

import java.util.List;


public interface MemberService {

    void join(MemberJoinDTO m) throws NotFoundException;

    void duplicateMember(String email) throws NotFoundException;

    void findPW(String email) throws NotFoundException;

    void delMem(String token) throws NotFoundException;

    void changePW(String email, String password) throws NotFoundException;

    MyProfileDTO changeInfo(MyProfileDTO myDto) throws NotFoundException;

    MemberOutputDTO getInfo(String tag) throws NotFoundException;

    TokenDto login(LoginDTO memberRequestDto);

    CharacterDTO getCharacter(String tag) throws NotFoundException;

    List<Member> findAllMember() throws NotFoundException;

    Member findKakaoMember(String sid) throws NotFoundException;

    MemberOutputDTO findInfo(String token) throws NotFoundException;

    void makeBan(String tag) throws NotFoundException;

    void cancelBan(String tag) throws NotFoundException;

    String getMyName(String tag) throws NotFoundException;

    List<Member> findMembersByName(int start, int size, String name);

    Long getMembersCntByName(String name);

    Member findMemberByIdTag(String idTag);
}
