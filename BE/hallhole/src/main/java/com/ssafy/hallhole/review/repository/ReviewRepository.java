package com.ssafy.hallhole.review.repository;

import com.ssafy.hallhole.review.domain.Review;
import com.ssafy.hallhole.review.dto.SummaryReviewDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review,Long> {

    @Query(value="select * from review where member_id=:mId and is_delete=false", nativeQuery = true)
    List<Review> findAllByMemberId(@Param("mId") Long mId);

    @Query(value="select * from review where performance_id=:pId and is_delete=false", nativeQuery = true)
    List<Review> findAllByPerformanceId(@Param("pId") String pId);

}
