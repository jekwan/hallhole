package com.ssafy.hallhole.twitter;

import com.ssafy.hallhole.twitter.service.TwitterService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.LocalDateTime;


@SpringBootTest
class TwitterTest {

    @Autowired
    private EntityManager em;

    @Autowired
    private TwitterService twitterService;

    @Test
    @Transactional
    public void get_tweet(){
        twitterService.TestTwitterLoading();
    }

    @Test
    @Transactional
    public void JPA_test() {
        LocalDateTime time = LocalDateTime.now();
        Twitter twitter = Twitter.builder().contents("test").id("testId").time(time).build();

        em.persist(twitter);

        System.out.println(twitter);
    }
}