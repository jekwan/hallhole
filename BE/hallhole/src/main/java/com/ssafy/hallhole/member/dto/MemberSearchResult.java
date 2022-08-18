package com.ssafy.hallhole.member.dto;

import com.ssafy.hallhole.member.domain.Member;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class MemberSearchResult {
    private Long MemberSearchCnt;
    private List<Member> members;
}

