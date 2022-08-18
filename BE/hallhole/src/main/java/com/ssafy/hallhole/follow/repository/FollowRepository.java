package com.ssafy.hallhole.follow.repository;

import com.ssafy.hallhole.follow.domain.Follow;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FollowRepository{

    void save(Follow follow);

    void delete(Follow follow);

    Follow findRelation(Long ing_id, Long ed_id);

    List<Follow> findRelationInMember(Long ing_id, Long ed_id);

    List<Follow> findByFollowingMemberId(int start, int size, Long ing_id);

    List<Follow> findByFollowedMemberId(int start, int size, Long ed_id);

    List<Follow> findAllRelationByMemberId(Long id);

}
