package com.ssafy.hallhole.performance.service;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.member.domain.Member;
import com.ssafy.hallhole.member.repository.MemberRepository;
import com.ssafy.hallhole.performance.domain.Performance;
import com.ssafy.hallhole.performance.domain.PerformanceLike;
import com.ssafy.hallhole.performance.dto.PerformanceLikePagingInputDTO;
import com.ssafy.hallhole.performance.repository.PerformanceLikeRepository;
import com.ssafy.hallhole.performance.repository.PerformanceRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PerformanceLikeServiceImpl implements PerformanceLikeService{

    private final MemberRepository memberRepository;

    private final PerformanceRepositoryImpl performanceRepository;

    private final PerformanceLikeRepository pLikeRepository;

    @Override
    public void makeLike(String pid, String userTag) throws NotFoundException {
        Member m = memberRepository.findByIdTag(userTag);
        if(m==null || m.isOut()){
            throw new NotFoundException("유효한 사용자가 아닙니다.");
        }

        Performance p = performanceRepository.findOnePerformanceById(pid);
        if(p==null){
            throw new NotFoundException("해당하는 공연이 존재하지 않습니다.");
        }

        PerformanceLike pLike = new PerformanceLike(p,m);

        if(pLikeRepository.findByAllData(pid,m.getId()).size()!=0) {
            throw new NotFoundException("이미 좋아요를 누른 공연입니다.");
        }

        pLikeRepository.save(pLike);

    }

    @Override
    public void cancelLike(String pid, String userTag) throws NotFoundException {
        Member m = memberRepository.findByIdTag(userTag);
        if(m==null || m.isOut()){
            throw new NotFoundException("유효한 사용자가 아닙니다.");
        }

        Performance p = performanceRepository.findOnePerformanceById(pid);
        if(p==null){
            throw new NotFoundException("해당하는 공연이 존재하지 않습니다.");
        }

        List<PerformanceLike> pLike = pLikeRepository.findByAllData(pid,m.getId());
        if(pLike.size()==0) {
            throw new NotFoundException("좋아요를 누르지 않은 공연입니다.");
        }

        pLikeRepository.delete(pLike.get(0));
    }

    @Override
    public Long findByPerformanceCnt(String pid) {
        return pLikeRepository.findByPerformanceId(pid);
    }

    @Override
    public List<Performance> findPerformanceLikePagingByMemberId(PerformanceLikePagingInputDTO inputDto) throws NotFoundException {

        Member m = memberRepository.findByIdTag(inputDto.getMemberTag());
        if(m==null || m.isOut()){
            throw new NotFoundException("유효한 사용자가 아닙니다.");
        }

        List<String> pidList = pLikeRepository.findAllPerformanceLikePagingByMemberId(
                inputDto.getStart(), inputDto.getSize(),m.getId());

        List<Performance> pList = new LinkedList<>();
        for(String pid:pidList){
            Performance p = performanceRepository.findOnePerformanceById(pid);
            pList.add(p);
        }

        return pList;
    }

    @Override
    public List<Performance> findPopularPerformance(int size) throws NotFoundException {
        List<String> pidList = pLikeRepository.findPopularPerformance(size);

        List<Performance> pList = new LinkedList<>();
        for(String pid:pidList){
            Performance p = performanceRepository.findOnePerformanceById(pid);
            pList.add(p);
        }

        return pList;
    }

    @Override
    public boolean isLike(String pid, String tag) throws NotFoundException {

        Member m = memberRepository.findByIdTag(tag);
        if(m==null || m.isOut()){
            throw new NotFoundException("유효한 사용자가 아닙니다.");
        }

        Performance p = performanceRepository.findOnePerformanceById(pid);
        if(p==null){
            throw new NotFoundException("해당하는 공연이 존재하지 않습니다.");
        }

        Long cnt = pLikeRepository.isLike(pid,m.getId());
        if(pLikeRepository.isLike(pid,m.getId())==0){
            return false;
        }
        return true;
    }

    @Override
    public Long likeCnt(String tag) throws NotFoundException {

        Member m = memberRepository.findByIdTag(tag);
        if(m==null || m.isOut()){
            throw new NotFoundException("유효한 사용자가 아닙니다.");
        }

        return pLikeRepository.likeCnt(m.getId());
    }
}
