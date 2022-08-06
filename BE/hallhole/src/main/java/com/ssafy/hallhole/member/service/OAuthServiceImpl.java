package com.ssafy.hallhole.member.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.ssafy.hallhole.member.domain.Member;
import com.ssafy.hallhole.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
@RequiredArgsConstructor
public class OAuthServiceImpl implements OAuthService{

    private final MemberRepository memberRepository;

    @Value("${kakao_restapi}")
    private String kakao_restapi;

    @Value("${kakao_redirectURI_1}")
    private String kakao_redirectURI_1;

    @Value("${kakao_redirectURI_2}")
    private String kakao_redirectURI_2;

    @Value("${kakao_client_secret}")
    private String kakao_client_secret;


    @Override
    public String getAccessToken(String code, String status){
        String access_Token = "";
        String refresh_Token = "";

        try {
            URL url = new URL("https://kauth.kakao.com/oauth/token");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();

            sb.append("grant_type=authorization_code");
            sb.append("&client_id="+kakao_restapi);
            if(status.equals("join")) sb.append("&redirect_uri="+kakao_redirectURI_1);
            else sb.append("&redirect_uri="+kakao_redirectURI_2);
            sb.append("&client_secret="+kakao_client_secret);
            sb.append("&code=" + code);
            bw.write(sb.toString());
            bw.flush();

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            access_Token = element.getAsJsonObject().get("access_token").getAsString();
            refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();
            br.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return access_Token;
    }

    @Override
    public Member findUserInfo(String code, String token) {

        String reqURL = "https://kapi.kakao.com/v2/user/me";
        Member member=null;

        //access_token을 이용하여 사용자 정보 조회
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + token);

            int responseCode = conn.getResponseCode();

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }

            //Gson 라이브러리로 JSON파싱
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            String id = Long.toString(element.getAsJsonObject().get("id").getAsLong());
            String name = element.getAsJsonObject().get("properties").getAsJsonObject().get("nickname").getAsString();
            boolean hasEmail = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("has_email").getAsBoolean();
            boolean has_age_range = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("has_age_range").getAsBoolean();
            boolean has_gender = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("has_gender").getAsBoolean();
            String email = "";
            String age_range = "";
            String gender = "N";
            if(hasEmail){
                email = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("email").getAsString();
            } if(has_age_range){
                age_range = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("age_range").getAsString();
            } if(has_gender){
                String tmp = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("gender").getAsString();
                if(tmp.equals("female")) gender = "F";
                else gender = "M";
            }

            member = new Member("KAKAO",id,name,email);
            br.close();

        } catch (IOException e) {
            e.printStackTrace();
        }

        return member;
    }

    @Override
    public void join(Member member) {
        duplicateMember(member.getKakaoSid());
        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

        boolean tagFlag=true;
        String tag="";
        while(tagFlag){
            String tmpTag = "";
            int idx = 0;
            for (int i = 0; i < 10; i++) {
                idx = (int) (charSet.length * Math.random());
                tmpTag += charSet[idx];
            }

            if(memberRepository.findByIdTag(tmpTag)==null) {
                tagFlag = false;
                member.setIdTag(tmpTag);
            }
        }
        member.addIdTag(tag);
        memberRepository.save(member);
    }

    @Override
    public Member login(String sid) {
        Member member = memberRepository.findBySid(sid);
        if(member==null){
            throw new IllegalStateException("가입되지 않은 이메일입니다.");
        }
        return member;
    }

    @Override
    public void duplicateMember(String sid){
        if(memberRepository.findBySid(sid)!=null) {
            throw new IllegalStateException("이미 가입된 카카오 아이디입니다.");
        }
    }
}
