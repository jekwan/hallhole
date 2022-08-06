package com.ssafy.hallhole.follow.repository;

import com.ssafy.hallhole.follow.domain.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow,Long> {

    @Query(value="select * from follow where following_member_id=:ing_id and followed_member_id=:ed_id", nativeQuery = true)
    Follow findRelation(@Param("ing_id") Long ing_id,@Param("ed_id") Long ed_id);

    @Query(value="select * from follow where following_member_id=:ing_id", nativeQuery = true)
    List<Follow> findByFollowingMemberId(@Param("ing_id") Long ing_id);

    @Query(value="select * from follow where followed_member_id=:ed_id", nativeQuery = true)
    List<Follow> findByFollowedMemberId(@Param("ed_id") Long ed_id);

    @Query(value="select * from follow where followed_member_id=:ed_id and following_member_id=:ing_id", nativeQuery = true)
    Follow findByRelation(@Param("ing_id") Long ing_id, @Param("ed_id") Long ed_id);

}
