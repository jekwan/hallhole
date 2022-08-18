package com.ssafy.hallhole.performance.service;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.performance.domain.Performance;
import com.ssafy.hallhole.performance.dto.PerformanceLikePagingInputDTO;

import java.util.List;

public interface PerformanceLikeService {

    void makeLike(String pid, String userTag) throws NotFoundException;

    void cancelLike(String pid, String userTag) throws NotFoundException;

    // 따로 공연별 좋아요 사람 목록은 안 뽑는 것 같아서 cnt만 return
    Long findByPerformanceCnt(String pid);

    List<Performance> findPerformanceLikePagingByMemberId(PerformanceLikePagingInputDTO inputDto) throws NotFoundException;

    List<Performance> findPopularPerformance(int size) throws NotFoundException;

    boolean isLike(String pid, String tag) throws NotFoundException;

    Long likeCnt(String tag) throws NotFoundException;
}
