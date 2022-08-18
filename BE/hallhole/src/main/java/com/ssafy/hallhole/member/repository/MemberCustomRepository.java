package com.ssafy.hallhole.member.repository;

import com.ssafy.hallhole.member.domain.Member;

import java.util.List;

public interface MemberCustomRepository {

    List<Member> findMembersByNamePaging(int start, int size, String name);

    Long getMemberCntByName(String name);

}
