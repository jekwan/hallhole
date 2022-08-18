package com.ssafy.hallhole.twitter.service;

import com.ssafy.hallhole.twitter.Twitter;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface TwitterService {


    void ScheduledTwitterLoading();

    void saveTwitter(Twitter twitter);

    Optional<Twitter> findOne(String id);

    List<Twitter> findAllTweet();

    @Transactional(readOnly = true)
    List<Twitter> findAllTweetPaging(Pageable pageable);

    void getBeforeTweet(int days);
}
