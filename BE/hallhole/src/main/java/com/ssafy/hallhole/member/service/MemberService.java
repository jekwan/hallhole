package com.ssafy.hallhole.member.service;

import com.ssafy.hallhole.advice.exceptions.BadRequestException;
import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.member.domain.Member;
import com.ssafy.hallhole.member.dto.CharacterDTO;
import com.ssafy.hallhole.member.dto.MemberJoinDTO;
import com.ssafy.hallhole.member.dto.MyProfileDTO;

import java.util.List;


public interface MemberService {

    String join(MemberJoinDTO m,String sessionId) throws NotFoundException;

    void duplicateMember(String email) throws NotFoundException;

    void findPW(String email) throws NotFoundException;

    void delMem(Long id) throws NotFoundException;

    void changePW(String email, String password) throws NotFoundException;

    Member changeInfo(MyProfileDTO myDto) throws NotFoundException;

    Member getInfo(Long id) throws NotFoundException;

    String login(String email, String password, String sessionId) throws NotFoundException;

    CharacterDTO getCharacter(Long id) throws NotFoundException;

    List<Member> findAllMember() throws NotFoundException;

    Member findKakaoMember(String sid) throws NotFoundException;

    Member findInfo(String token) throws NotFoundException;

}
