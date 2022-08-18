package com.ssafy.hallhole.member.repository;

import com.ssafy.hallhole.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member,Long> {

    Member findByIdTag(String tag);

    @Query(value="select * from member where email=:email and is_out=false", nativeQuery = true)
    Member findByEmail(@Param("email") String email);

    @Query(value="select * from member where id=:id and is_out=false", nativeQuery = true)
    Member findById(@Param("id") String email);

    @Query(value="select * from member where email=:email and is_out=false", nativeQuery = true)
    List<Member> findAllByEmail(@Param("email") String email);

    @Query(value="select * from member where kakao_sid=:kakao_sid and is_out=false", nativeQuery = true)
    Member findBySid(@Param("kakao_sid") String kakao_sid);

    @Query(value="select * from member where is_out=false", nativeQuery = true)
    List<Member> findAllAliveMember();

    boolean existsByEmail(String email);

}
