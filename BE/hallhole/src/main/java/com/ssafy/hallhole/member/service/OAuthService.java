package com.ssafy.hallhole.member.service;

import com.ssafy.hallhole.member.domain.Member;

public interface OAuthService {

    String getAccessToken (String code, String status);

    Member findUserInfo(String code, String token);

    void join(Member member);

    void duplicateMember(String sid);

    Member login(String sid);

}
