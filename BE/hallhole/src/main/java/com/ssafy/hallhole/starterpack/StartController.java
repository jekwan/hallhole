package com.ssafy.hallhole.starterpack;

import com.ssafy.hallhole.performance.service.PerformanceService;
import com.ssafy.hallhole.twitter.service.TwitterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/starterpack")
public class StartController {

    private final TwitterService twitterService;

    private final PerformanceService performanceService;

    @GetMapping
    public void initStart() {
        twitterService.getBeforeTweet(30);
        performanceService.scheduledOpenAndCloseChat();
    }
}
