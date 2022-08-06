package com.ssafy.hallhole.twitter.service;

import com.ssafy.hallhole.twitter.Twitter;

import java.util.List;
import java.util.Optional;

public interface TwitterService {

    void TestTwitterLoading();

    void saveTwitter(Twitter twitter);

    Optional<Twitter> findOne(String id);

    List<Twitter> findAllTweet();

}
