package com.ssafy.hallhole.mail;

import com.ssafy.hallhole.member.domain.Member;
import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MailService{

    private final JavaMailSender emailSender;

    public void sendPWMail(String email) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("leemyo5435@gmail.com");

        message.setTo(email);
        message.setSubject("비밀번호 변경 메일입니다.");

//        String url="www.naver.com";
//        message.setText(url+"\n"+"비밀번호 바꾸려면 눌러주세요.");
        emailSender.send(message);
    }

    public void sendCongMail(Member member){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("leemyo5435@gmail.com");

        message.setTo(member.getEmail());
        String title="[HallHole] ";
        if(!member.getName().equals("")){
            title+=member.getName()+"님!";
        }
        title+="가입을 축하드립니다!";
        message.setSubject(title);

        message.setText("가입을...축하...");
        emailSender.send(message);
    }
}