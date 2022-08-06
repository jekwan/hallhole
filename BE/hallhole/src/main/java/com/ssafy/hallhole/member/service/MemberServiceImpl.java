package com.ssafy.hallhole.member.service;

import com.ssafy.hallhole.advice.exceptions.BadRequestException;
import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.mail.MailService;
import com.ssafy.hallhole.member.domain.Gender;
import com.ssafy.hallhole.member.domain.Member;
import com.ssafy.hallhole.member.dto.CharacterDTO;
import com.ssafy.hallhole.member.dto.MemberJoinDTO;
import com.ssafy.hallhole.member.dto.MyProfileDTO;
import com.ssafy.hallhole.member.repository.HashMapRepository;
import com.ssafy.hallhole.member.repository.MemberRepository;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final MailService mailService;

    private final JwtTokenProviderImpl jwtTokenService;
    private final HashMapRepository sessionRepository;



    @Override
    public String join(MemberJoinDTO m,String sessionId) throws NotFoundException {

        Member member = new Member(m.getEmail(),m.getName(),m.getPw());
        duplicateMember(member.getEmail());
        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

        boolean tagFlag=true;
        while(tagFlag){
            String tmpTag = "";
            int idx = 0;
            for (int i = 0; i < 10; i++) {
                idx = (int) (charSet.length * Math.random());
                tmpTag += charSet[idx];
            }

            if(memberRepository.findByIdTag(tmpTag)==null) {
                tagFlag = false;
                member.setIdTag(tmpTag);
            }
        }
        memberRepository.save(member);
//        mailService.sendCongMail(member); // 테스트 데이터를 넣기 위해 지움. 나중에 풀기
        sessionRepository.addSession(member.getId(),sessionId);

        return jwtTokenService.createToken(member.getId(), sessionId);
    }

    @Override
    public void duplicateMember(String email) throws NotFoundException {
        if(memberRepository.findByEmail(email)!=null) {
            throw new NotFoundException("이미 사용 중인 이메일입니다.");
        }
    }

    @Override
    public void findPW(String email) throws NotFoundException {
        Member member = memberRepository.findByEmail(email);
        if(member==null || member.isOut()){
            throw new NotFoundException("유효한 회원이 아닙니다.");
        }

//        mailService.sendPWMail(email);
        memberRepository.save(member);
    }

    @Override
    public void delMem(Long id) throws NotFoundException {
        Member member = memberRepository.findById(id).get();
        if(member==null || member.isOut()){
            throw new NotFoundException("유효한 회원이 아닙니다.");
        }
        member.setOut(true);
        memberRepository.save(member);
    }

    @Override
    public void changePW(String email,String password) throws NotFoundException {
        Member member = memberRepository.findByEmail(email);

        if(member==null || member.isOut()){
            throw new NotFoundException("유효한 회원이 아닙니다.");
        }

        System.out.println(member.getPassword());
        memberRepository.save(member);
    }

    @Override
    public Member changeInfo(MyProfileDTO myDto) throws NotFoundException {

        Member member = memberRepository.findById(myDto.getId()).get();

        if(member==null || member.isOut()){
            throw new NotFoundException("유효한 회원이 아닙니다.");
        }

        member.setName(myDto.getName());
        member.setProfile(myDto.getProfile());

        Gender g = Gender.N;
        Gender gender = myDto.getGender();
        if(gender.equals("F")) g = Gender.F;
        else if(gender.equals("M")) g = Gender.M;
        member.setGender(g);

        member.setNowBg(myDto.getNowBg());
        member.setNowChar(myDto.getNowChar());
        member.setNowAcc(myDto.getNowAcc());

        memberRepository.save(member);

        return member;
    }

    @Override
    public Member getInfo(Long id) throws NotFoundException {
        Member member = memberRepository.findById(id).get();
        if(member==null || member.isOut()){
            throw new NotFoundException("유효한 회원이 아닙니다.");
        }
        return member;
    }

    @Override
    public String login(String email, String password, String sessionId) throws NotFoundException {
        Member member = memberRepository.findByEmail(email);
        if(member==null || member.isOut()){
            throw new NotFoundException("유효한 회원이 아닙니다.");
        }
        if(!member.getPassword().equals(password)){
            throw new NotFoundException("비밀번호를 다시 입력해주세요.");
        }

        return jwtTokenService.createToken(member.getId(), sessionId);
    }

    @Override
    public CharacterDTO getCharacter(Long id) throws NotFoundException {
        Member m = memberRepository.findById(id).get();
        if(m==null || m.isOut()){
            throw new NotFoundException("유효한 회원이 아닙니다.");
        }

        CharacterDTO character = new CharacterDTO(id, m.getNowBg(),
                m.getNowChar(), m.getNowAcc());
        return character;
    }

    @Override
    public List<Member> findAllMember() throws NotFoundException {
        List<Member> memberList = memberRepository.findAllAliveMember();
        if(memberList.size()==0)
            throw new NotFoundException("현재 유효한 회원이 없습니다.");
        return memberList;
    }

    @Override
    public Member findKakaoMember(String sid) throws NotFoundException {
        Member member = memberRepository.findBySid(sid);

        if(member==null || member.isOut()){
            throw new NotFoundException("유효한 회원이 아닙니다.");
        }

        return member;
    }

    @Override
    public Member findInfo(String token) throws NotFoundException {
        Claims claim = jwtTokenService.getAllclaimsFromToken(token);
        Long userId = Long.parseLong(claim.get("userId").toString());
        Member member = memberRepository.findById(userId).get();
        if(member==null || member.isOut()){
            throw new NotFoundException("유효한 회원이 아닙니다.");
        }
        return member;
    }


}
