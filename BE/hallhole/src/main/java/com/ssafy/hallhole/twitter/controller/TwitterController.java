package com.ssafy.hallhole.twitter.controller;

import com.ssafy.hallhole.twitter.Twitter;
import com.ssafy.hallhole.twitter.service.TwitterService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/twitter")
@RequiredArgsConstructor
public class TwitterController {

    private final TwitterService twitterService;

    @GetMapping
    @ApiOperation(value="트윗 가져오기")
    public List<Twitter> getTweet(){
        return twitterService.findAllTweet();
    }
}
