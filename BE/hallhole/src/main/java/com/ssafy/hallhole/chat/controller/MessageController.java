package com.ssafy.hallhole.chat.controller;


import com.ssafy.hallhole.chat.domain.ChatLog;
import com.ssafy.hallhole.chat.domain.ChatType;
import com.ssafy.hallhole.chat.domain.Chatroom;
import com.ssafy.hallhole.chat.service.ChatLogService;
import com.ssafy.hallhole.chat.service.ChatroomService;
import com.ssafy.hallhole.member.domain.Member;
import com.ssafy.hallhole.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.TimeZone;

import static java.time.ZoneId.*;

@RestController
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessageSendingOperations sendingOperations;

    private final ChatroomService chatroomService;

    private final ChatLogService chatLogService;

    private final MemberService memberService;

    @MessageMapping("/chat/message")
    @Transactional
    public void enter(ChatLog message) {
        if (ChatType.ENTER.equals(message.getType())) {
            message.setMessage(message.getMemberNickName() + "님이 입장하였습니다.");
            // 사용자 추가
            chatroomService.addUser(message);

        } else if (ChatType.TALK.equals(message.getType())) {
            //db 저장
            Member member = memberService.findMemberByIdTag(message.getIdTag());
            message.setBackground(String.valueOf(member.getNowBg()));
            message.setCharacterType(String.valueOf(member.getNowChar()));
            message.setAccessoryType(String.valueOf(member.getNowAcc()));
            message.setMessageTime(LocalDateTime.from(ZonedDateTime.now(ZoneId.of("Asia/Seoul"))));
            chatLogService.saveChat(message);

        } else if (ChatType.OUT.equals(message.getType())) {
            message.setMessage(message.getMemberNickName() + "님이 퇴장하였습니다.");
            // 사용자 제거
            chatroomService.subUser(message);
        }
        sendingOperations.convertAndSend("/topic/chat/room/" + message.getPerformanceId(), message);
    }
}