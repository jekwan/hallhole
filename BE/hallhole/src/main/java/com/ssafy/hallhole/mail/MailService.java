package com.ssafy.hallhole.mail;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.member.domain.Member;
import com.ssafy.hallhole.member.dto.AuthEmailDTO;
import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.concurrent.ThreadLocalRandom;

@Service
@AllArgsConstructor
public class MailService{

    private final JavaMailSender emailSender;

    public AuthEmailDTO sendPWMail(String email) {
        SimpleMailMessage message = new SimpleMailMessage();
        String authKey="";
        try{
            message.setFrom("leemyo5435@gmail.com");

            message.setTo(email);
            message.setSubject("[HallHole] 비밀번호 변경 관련 인증번호입니다.");

            //인증키 6자리 랜덤으로 생성 후 초기화
            authKey = Integer.toString( ThreadLocalRandom.current().nextInt(100000, 1000000) );

            message.setText("인증번호는 " + authKey + "입니다.\n비밀번호 바꾸려면 눌러주세요.");
            emailSender.send(message);

        }catch(Exception e){
            e.printStackTrace();
        }

        return new AuthEmailDTO(email, authKey);
    }

    public void sendCongMail(Member member){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("leemyo5435@gmail.com");

        message.setTo(member.getEmail());
        String title="[HallHole] ";
        if(!member.getName().equals("")){
            title+=member.getName()+"님! ";
        }
        title+="가입을 축하드립니다!";
        message.setSubject(title);

        message.setText("여기에 홀홀 설명 쓰면 좋을듯");
        emailSender.send(message);
    }
}