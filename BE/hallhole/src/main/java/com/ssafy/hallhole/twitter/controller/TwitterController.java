package com.ssafy.hallhole.twitter.controller;

import com.ssafy.hallhole.twitter.Twitter;
import com.ssafy.hallhole.twitter.service.TwitterService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/twitter")
@RequiredArgsConstructor
public class TwitterController {

    private final TwitterService twitterService;

    @GetMapping
    @ApiOperation(value = "트윗 가져오기")
    public List<Twitter> getTweet() {
        return twitterService.findAllTweet();
    }

    @GetMapping("/page")
    @ApiOperation(value = "트윗 페이징하여 가져오기", notes = "'/twitter/page?start=0&size=10' 형식으로 사용")
    public List<Twitter> getTweetPaging(Pageable pageable) {
        return twitterService.findAllTweetPaging(pageable);
    }
}
