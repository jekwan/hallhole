package com.ssafy.hallhole.member.controller;

import com.ssafy.hallhole.advice.exceptions.BadRequestException;
import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.mail.MailService;
import com.ssafy.hallhole.member.domain.Member;
import com.ssafy.hallhole.member.dto.*;
import com.ssafy.hallhole.member.service.MemberServiceImpl;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Arrays;
import java.util.Map;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
@ApiOperation(value = "memberController")
public class MemberController {

    private final MemberServiceImpl memberService;

    private final MailService mailService;

    @PostMapping("/join")
    @ApiOperation(value="홀홀 회원가입", notes = "가입 축하 메일 막아뒀습니다")
    public void join(@RequestBody MemberJoinDTO member, HttpSession session) throws NotFoundException {
        memberService.join(member);
    }

    @PostMapping("/login")
    @ApiOperation(value="홀홀 로그인", notes = "이메일, 패스워드 입력 필요")
    public TokenDto login(@RequestBody LoginDTO memberRequestDto, HttpSession session) throws NotFoundException {
        return memberService.login(memberRequestDto);
    }

    @PostMapping("/chk-email")
    @ApiOperation(value="이메일 체크", notes = "이메일 형식이 맞는지 boolean 형식으로 return")
    public boolean emailCheck(@RequestBody String email){
        return Pattern.matches("\\w+@\\w+\\.\\w+(\\.\\w+)?", email);
    }

    @PostMapping("/chk-pw")
    @ApiOperation(value="비밀번호 체크",
            notes =  "비밀번호 형식: 8-20자, 숫자/특수문자($`~!@$!%*#^?&()_=+)/영문자 필수 >> boolean 형식으로 return")
    public boolean pwCheck(@RequestBody String pw){
        return Pattern.matches("^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\\\(\\\\)\\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\\\(\\\\)\\-_=+]).{8,20}$" , pw);
    }

    @GetMapping("/logout")
    @ApiOperation(value="홀홀 로그아웃")
    public ResponseEntity logout() throws NotFoundException {
        try{
            throw new NotFoundException("로그아웃 성공");
        }catch(Exception e){
            throw new NotFoundException("로그아웃 실패");
        }
    }

    @GetMapping("/my-info")
    @ApiOperation(value="내 정보 토큰으로 받아오기")
    public MemberOutputDTO getMyInfo(@RequestHeader Map<String, Object> requestHeader) throws NotFoundException {
        try{
            String token = (String) requestHeader.get("token");
            return memberService.findInfo(token);
        }catch(Exception e){
            throw new NotFoundException("토큰이 넘어오지 않았거나, 유효한 토큰이 아닙니다.");
        }
    }

    @GetMapping("/my-name")
    @ApiOperation(value="내 닉네임 태그로 받아오기", notes = "'/member/my-name?tag=JVWUZ9HZ9W' 형식으로 사용")
    public String getMyName(@RequestParam("tag") String tag) throws NotFoundException {
        return memberService.getMyName(tag);
    }

    @PostMapping("/pwmail")
    @ApiOperation(value="비밀번호 변경을 위한 인증번호 전송 api")
    public AuthEmailDTO findPW(@RequestBody EmailDTO emailDto) throws NotFoundException {
        return mailService.sendPWMail(emailDto.getEmail());
    }

    @PostMapping("/new-pw")
    @ApiOperation(value = "비밀번호 링크 접속 후 변경")
    public TokenDto changePW(@RequestBody LoginDTO member)  throws NotFoundException {
        memberService.changePW(member.getEmail(), member.getPw());
        return memberService.login(member);
    }

    @PutMapping("/out")
    @ApiOperation(value = "회원 탈퇴")
    public void delMember(HttpServletRequest request) throws NotFoundException {
        memberService.delMem(request.getHeader("token"));
    }

    @PutMapping("")
    @ApiOperation(value = "프로필 변경")
    public MyProfileDTO changeInfo(@RequestBody MyProfileDTO myDto) throws NotFoundException {
        return memberService.changeInfo(myDto);
    }

    @GetMapping("/info/{tag}")
    @ApiOperation(value = "유저 데이터 조회", notes = "'/member/info/JVWUZ9HZ9W' 형식으로 사용. tag = 멤버태그")
    public MemberOutputDTO getInfo(@PathVariable("tag") String tag) throws NotFoundException {
        return memberService.getInfo(tag);
    }

    @GetMapping("/deco/{tag}")
    @ApiOperation(value = "현재 멤버 캐릭터 배경, 캐릭터, 악세사리 값 가져오기",
            notes = "'/member/deco/JVWUZ9HZ9W' 형식으로 사용. tag = 멤버태그")
    public CharacterDTO getCharacter(@PathVariable("tag") String tag) throws NotFoundException{
        return memberService.getCharacter(tag);
    }

    @PostMapping("/ban/{tag}")
    @ApiOperation(value = "유저 밴 시키기", notes = "'/member/ban/JVWUZ9HZ9W' 형식으로 사용. tag = 멤버태그")
    public void makeBan(@PathVariable("tag") String tag) throws NotFoundException{
        memberService.makeBan(tag);
    }

    @PostMapping("/cancel-ban/{tag}")
    @ApiOperation(value = "유저 밴 풀기", notes = "'/member/cancel-ban/JVWUZ9HZ9W' 형식으로 사용. tag = 멤버태그")
    public void cancelBan(@PathVariable("tag") String tag) throws NotFoundException{
        memberService.cancelBan(tag);
    }

    @GetMapping("/search/{name}")
    @ApiOperation(value = "멤버 검색",notes = "'/member/search/{name}?start=0&size=20' 형식으로 사용")
    public MemberSearchResult searchMemberByName(@RequestParam("start") int start, @RequestParam("size") int size, @PathVariable("name") String name){
        MemberSearchResult memberSearchResult = MemberSearchResult.builder()
                .members(memberService.findMembersByName(start, size, name))
                .MemberSearchCnt(memberService.getMembersCntByName(name))
                .build();
        return memberSearchResult;
    }

}
