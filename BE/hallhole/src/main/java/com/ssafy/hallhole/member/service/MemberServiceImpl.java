package com.ssafy.hallhole.member.service;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.chat.service.ChatroomServiceImpl;
import com.ssafy.hallhole.comment.domain.Comment;
import com.ssafy.hallhole.comment.repository.CommentRepository;
import com.ssafy.hallhole.follow.domain.Follow;
import com.ssafy.hallhole.follow.repository.FollowRepositoryImpl;
import com.ssafy.hallhole.mail.MailService;
import com.ssafy.hallhole.member.domain.Authority;
import com.ssafy.hallhole.member.domain.Gender;
import com.ssafy.hallhole.member.domain.Member;
import com.ssafy.hallhole.member.dto.*;
import com.ssafy.hallhole.member.jwt.TokenProvider;
import com.ssafy.hallhole.member.repository.MemberCustomRepositoryImpl;
import com.ssafy.hallhole.member.repository.MemberRepository;
import com.ssafy.hallhole.performance.domain.PerformanceLike;
import com.ssafy.hallhole.performance.repository.PerformanceLikeRepositoryImpl;
import com.ssafy.hallhole.review.domain.ReactionCnt;
import com.ssafy.hallhole.review.domain.ReactionType;
import com.ssafy.hallhole.review.domain.Review;
import com.ssafy.hallhole.review.domain.ReviewReaction;
import com.ssafy.hallhole.review.repository.ReactionCntRepositoryImpl;
import com.ssafy.hallhole.review.repository.ReviewReactionRepositoryImpl;
import com.ssafy.hallhole.review.repository.ReviewRepository;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import java.util.regex.Pattern;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    private final MemberCustomRepositoryImpl memberCustomRepository;

    private final ReviewRepository reviewRepository;
    private final CommentRepository commentRepository;

    private final MailService mailService;

    private final FollowRepositoryImpl followRepository;

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final TokenProvider tokenProvider;
    private final ChatroomServiceImpl chatroomService;
    private final PerformanceLikeRepositoryImpl pLikeRepository;

    private final ReviewReactionRepositoryImpl rrRepository;

    private final ReactionCntRepositoryImpl rcRepository;

    private static final String AUTHORITIES_KEY = "auth";

    private final PasswordEncoder passwordEncoder;

    @Override
    public void join(MemberJoinDTO m) throws NotFoundException {

        Member member = new Member(m.getEmail(),m.getName(),passwordEncoder.encode(m.getPw()));
        duplicateMember(member.getEmail());

        if(!Pattern.matches(
                "^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\\\(\\\\)\\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\\\(\\\\)\\-_=+]).{8,20}$" , m.getPw()))
            throw new NotFoundException("??????????????? ?????? ??????????????????");
        if(!Pattern.matches("\\w+@\\w+\\.\\w+(\\.\\w+)?", m.getEmail()))
            throw new NotFoundException("???????????? ?????? ??????????????????.");

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
        member.setAuthority(Authority.ROLE_USER);
        member.setBirth(LocalDate.now());
        member.setProfile("-");
        member.setGender(Gender.N);


        memberRepository.save(member);
    }

    public TokenDto login(LoginDTO memberRequestDto) {
        // 1. Login ID/PW ??? ???????????? AuthenticationToken ??????
        UsernamePasswordAuthenticationToken authenticationToken = memberRequestDto.toAuthentication();

        // 2. ????????? ?????? (????????? ???????????? ??????) ??? ??????????????? ??????
        //    authenticate ???????????? ????????? ??? ??? CustomUserDetailsService ?????? ???????????? loadUserByUsername ???????????? ?????????
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. ?????? ????????? ???????????? JWT ?????? ??????
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);
        Member m = memberRepository.findByEmail(memberRequestDto.getEmail());

        // 5. ?????? ??????
        return tokenDto;
    }

    @Override
    public void duplicateMember(String email) throws NotFoundException {
        if(memberRepository.findByEmail(email)!=null) {
            throw new NotFoundException("?????? ?????? ?????? ??????????????????.");
        }
    }

    @Override
    public void findPW(String email) throws NotFoundException {
        Member member = memberRepository.findByEmail(email);
        if(member==null || member.isOut()){
            throw new NotFoundException("????????? ????????? ????????????.");
        }

//        mailService.sendPWMail(email);
        memberRepository.save(member);
    }

    @Override
    public void delMem(String token) throws NotFoundException {

        Claims claim = tokenProvider.parseClaims(token);

        if (claim.get(AUTHORITIES_KEY) == null) {
            throw new RuntimeException("?????? ????????? ?????? ???????????????.");
        }



        String tag = claim.get("sub").toString();
        Member m = memberRepository.findByIdTag(tag);
        if(m==null || m.isOut()){
            throw new NotFoundException("????????? ????????? ????????????.");
        }



        // ????????? ????????? ?????????
        List<Follow> followList = followRepository.findAllRelationByMemberId(m.getId());

        for(Follow f:followList){
            f.getFollowedMember().subFollowerCnt();
            f.getFollowingMember().subFollowingCnt();

            memberRepository.save(f.getFollowingMember());
            memberRepository.save(f.getFollowedMember());

            followRepository.delete(f);
        }

        //performanceLike ????????? ?????????
        List<PerformanceLike> pLikeList = pLikeRepository.findMyLikeListById(m.getId());

        for(PerformanceLike p: pLikeList){
            pLikeRepository.delete(p);
        }

        // ????????? ?????????
        chatroomService.outJoinedChatRoom(m.getIdTag());

        // ?????? ????????? ?????????
        List<Comment> commentList = commentRepository.findAllCommentByMemberId(m.getId());

        for(Comment c:commentList){
            c.setDelete(true);
            commentRepository.save(c);
        }

        // ?????? ????????? ????????? ?????????
        List<ReviewReaction> reactionList = rrRepository.findAllReactionByMemberId(m.getId());

        for(ReviewReaction r:reactionList){
            ReactionType rType = r.getReactiontype();
            ReactionCnt rCnt = rcRepository.findReactionCnt(r.getId(), rType.getId());
            List<ReviewReaction> rList = rrRepository.findReactionByAllData(r.getReview().getId(), m.getId());
            for(ReviewReaction rr: rList){
                rrRepository.delete(rr);
            }

            if(rCnt.getReactionCnt()!=0){
                rcRepository.save(rCnt);
            }
            else {
                rcRepository.delete(rCnt);

            }

            rrRepository.delete(r);
        }

        // ?????? ????????? ?????????
        List<Review> reviewList = reviewRepository.findAllByMemberId(m.getId());

        for(Review r:reviewList){
            r.setDelete(true);
            reviewRepository.save(r);
        }


        m.setOut(true);
        m.setOutDate(LocalDate.now());
        memberRepository.save(m);
    }

    @Override
    public void changePW(String email,String password) throws NotFoundException {
        Member member = memberRepository.findByEmail(email);

        if(member==null || member.isOut()){
            throw new NotFoundException("????????? ????????? ????????????.");
        }

        member.setPassword(passwordEncoder.encode(password));
        memberRepository.save(member);
    }

    @Override
    public MyProfileDTO changeInfo(MyProfileDTO myDto) throws NotFoundException {

        Member m = memberRepository.findByIdTag(myDto.getIdTag());

        if(m==null || m.isOut()){
            throw new NotFoundException("????????? ????????? ????????????.");
        }

        m.setName(myDto.getName());
        m.setProfile(myDto.getProfile());

        Gender g = Gender.N;
        Gender gender = myDto.getGender();
        if(gender==Gender.F) g = Gender.F;
        else if(gender==Gender.M) g = Gender.M;
        m.setGender(g);
        m.setBirth(myDto.getBirth());

        memberRepository.save(m);

        MyProfileDTO member = new MyProfileDTO(m.getIdTag(),m.getName(),m.getEmail(),
                m.getGender(),m.getBirth(),m.getProfile());

        return member;
    }

    @Override
    public MemberOutputDTO getInfo(String tag) throws NotFoundException {
        Member m = memberRepository.findByIdTag(tag);
        if(m==null || m.isOut()){
            throw new NotFoundException("????????? ????????? ????????????.");
        }

        MemberOutputDTO member = new MemberOutputDTO(m.getName(),m.getEmail(),
                m.getGender(),m.getBirth(),m.isAdmin(),m.getPoint(),m.isOut(),m.getIdTag(),m.isBan(),
                m.getFollowingCnt(),m.getFollowerCnt(),m.getProfile(),m.getNowBg(),m.getNowChar(),
                m.getNowAcc());

        return member;
    }

    @Override
    public CharacterDTO getCharacter(String tag) throws NotFoundException {
        Member m = memberRepository.findByIdTag(tag);
        if(m==null || m.isOut()){
            throw new NotFoundException("????????? ????????? ????????????.");
        }

        CharacterDTO character = new CharacterDTO(tag,m.getNowBg(), m.getNowChar(), m.getNowAcc());
        return character;
    }

    @Override
    public List<Member> findAllMember() throws NotFoundException {
        List<Member> memberList = memberRepository.findAllAliveMember();
        if(memberList.size()==0)
            throw new NotFoundException("?????? ????????? ????????? ????????????.");
        return memberList;
    }

    @Override
    public Member findKakaoMember(String sid) throws NotFoundException {
        Member member = memberRepository.findBySid(sid);

        if(member==null || member.isOut()){
            throw new NotFoundException("????????? ????????? ????????????.");
        }

        return member;
    }

    @Override
    public MemberOutputDTO findInfo(String token) throws NotFoundException {
        Claims claim = tokenProvider.parseClaims(token);
        String tag = claim.get("sub").toString();
        Member m = memberRepository.findByIdTag(tag);
        if(m==null || m.isOut()){
            throw new NotFoundException("????????? ????????? ????????????.");
        }

        MemberOutputDTO member = new MemberOutputDTO(m.getName(),m.getEmail(),
                m.getGender(),m.getBirth(),m.isAdmin(),m.getPoint(),m.isOut(),m.getIdTag(),m.isBan(),
                m.getFollowingCnt(),m.getFollowerCnt(),m.getProfile(),m.getNowBg(),m.getNowChar(),
                m.getNowAcc());

        return member;
    }

    @Override
    public void makeBan(String tag) throws NotFoundException {
        Member m = memberRepository.findByIdTag(tag);
        if(m==null || m.isOut()){
            throw new NotFoundException("????????? ????????? ????????????.");
        }

        m.setBan(true);
        memberRepository.save(m);
    }

    @Override
    public void cancelBan(String tag) throws NotFoundException {
        Member m = memberRepository.findByIdTag(tag);
        if(m==null || m.isOut()){
            throw new NotFoundException("????????? ????????? ????????????.");
        }

        m.setBan(false);
        memberRepository.save(m);
    }

    @Override
    public String getMyName(String tag) throws NotFoundException {
        Member m = memberRepository.findByIdTag(tag);
        if(m==null || m.isOut()){
            throw new NotFoundException("????????? ????????? ????????????.");
        }

        return m.getName();
    }

    @Override
    public List<Member> findMembersByName(int start, int size, String name) {
        return memberCustomRepository.findMembersByNamePaging(start, size, name);
    }

    @Override
    public Long getMembersCntByName(String name) {
        return memberCustomRepository.getMemberCntByName(name);
    }

    @Override
    public Member findMemberByIdTag(String idTag) {
        return memberRepository.findByIdTag(idTag);
    }

}
