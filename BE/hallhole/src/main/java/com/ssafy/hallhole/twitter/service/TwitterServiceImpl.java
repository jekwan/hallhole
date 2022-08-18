package com.ssafy.hallhole.twitter.service;

import com.ssafy.hallhole.twitter.Twitter;
import com.ssafy.hallhole.twitter.repository.TwitterRepository;
import io.github.redouane59.twitter.TwitterClient;
import io.github.redouane59.twitter.dto.endpoints.AdditionalParameters;
import io.github.redouane59.twitter.dto.tweet.Tweet;
import io.github.redouane59.twitter.dto.tweet.TweetList;
import io.github.redouane59.twitter.dto.tweet.TweetType;
import io.github.redouane59.twitter.dto.tweet.TweetV2;
import io.github.redouane59.twitter.dto.user.UserV2;
import io.github.redouane59.twitter.signature.TwitterCredentials;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class TwitterServiceImpl implements TwitterService {

    private final TwitterRepository twitterRepository;

    private final Environment env;

    @Override
    @Transactional
    @Scheduled(cron = "0 0/1 * * * ?")
    public void ScheduledTwitterLoading() {
        getBeforeTweet(1);
    }

    @Override
    @Transactional
    public void saveTwitter(Twitter twitter) {
        if (findOne(twitter.getId()).isEmpty()) {
            twitterRepository.save(twitter);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Twitter> findOne(String id) {
        return Optional.ofNullable(twitterRepository.findTwitterById(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<Twitter> findAllTweet() {
        return twitterRepository.findAllByOrderByTimeDesc();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Twitter> findAllTweetPaging(Pageable pageable) {
        return twitterRepository.findAllByOrderByTimeDesc(pageable);
    }


    @Override
    @Transactional
    public void getBeforeTweet(int days){
        LocalDateTime endLocalDateTime = LocalDateTime.now();
        LocalDateTime startLocalDateTime = endLocalDateTime.minusDays(days);
        AdditionalParameters additionalParameters = AdditionalParameters.builder().startTime(startLocalDateTime).endTime(endLocalDateTime).build();

        TwitterClient twitterClient = new TwitterClient(TwitterCredentials.builder()
                .accessToken(env.getProperty("twitterAccessToken"))
                .accessTokenSecret(env.getProperty("twitterAccessTokenSecret"))
                .apiKey(env.getProperty("twitterApiKey"))
                .apiSecretKey(env.getProperty("twitterApiSecret"))
                .build());

        UserV2 userV2 = twitterClient.getUserFromUserName("TicketOpen"); //@를 제외한 아이디

        TweetList tweetList = twitterClient.getUserTimeline(userV2.getId(), additionalParameters);
        for (TweetV2.TweetData tweet : tweetList.getData()) {
            if (tweet.getText().contains("블루스퀘어")) {
                if (tweet.getText().contains("콘서트") || tweet.getText().contains("팬미팅") || tweet.getText().contains("어워즈")) {
                    continue;
                }
            } else {
                if (!tweet.getText().contains("뮤지컬") && !tweet.getText().contains("연극") && !tweet.getText().contains("극단"))
                    continue;
            }
            Twitter tweetData = null;
            if (tweet.getTweetType().equals(TweetType.RETWEETED)) {
                Tweet refTweet = twitterClient.getTweet(tweet.getReferencedTweets().get(0).getId());
                tweetData = Twitter.builder().id(refTweet.getId()).contents(refTweet.getText()).time(refTweet.getCreatedAt()).build();
            } else {
                tweetData = Twitter.builder().id(tweet.getId()).contents(tweet.getText()).time(tweet.getCreatedAt()).build();
            }
            List<String> splitContent = List.of(tweetData.getContents().split("▶|\uD83D\uDCCD"));

            String contents = splitContent.get(0);
            if (splitContent.size() == 2) {
                contents = splitContent.get(0);
            } else if (splitContent.size() == 3) {
                contents = splitContent.get(0) + "\n" + splitContent.get(1);
            } else {
                contents = tweetData.getContents();
            }
            Pattern pattern = Pattern.compile("(http|ftp|https)://([\\w_-]+(?:(?:\\.[\\w_-]+)+))([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?");
            Matcher matcher = pattern.matcher(tweetData.getContents());

            String url = "";
            while (matcher.find()) {
                String match = matcher.group();
                url = match;
                break;
            }
            Twitter res = Twitter.builder().id(tweet.getId()).contents(contents).url(url).time(tweetData.getTime()).build();
            saveTwitter(res);
        }
    }
}
