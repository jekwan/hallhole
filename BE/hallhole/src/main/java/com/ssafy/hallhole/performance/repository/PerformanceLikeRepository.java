package com.ssafy.hallhole.performance.repository;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.performance.domain.PerformanceLike;

import java.util.List;

public interface PerformanceLikeRepository {

    void save(PerformanceLike pLike);

    void delete(PerformanceLike pLike);

    // 검색(공연+멤버)
    List<PerformanceLike> findByAllData(String pid, Long uid);

    // 검색(공연별)
    Long findByPerformanceId(String pid);

    // 검색(멤버별)
    List<String> findAllPerformanceLikePagingByMemberId(int start, int size, Long uid);

    // 제일 인기있는 공연 정보
    List<String> findPopularPerformance(int size) throws NotFoundException;

    // 해당 멤버가 해당 공연을 좋아요 했는지
    Long isLike(String pid, Long uid);

    Long likeCnt(Long uid);

    List<PerformanceLike> findMyLikeListById(Long uid);

}
