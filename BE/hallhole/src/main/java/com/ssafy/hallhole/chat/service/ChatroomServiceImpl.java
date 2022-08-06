package com.ssafy.hallhole.chat.service;

import com.ssafy.hallhole.chat.domain.ChatLog;
import com.ssafy.hallhole.chat.domain.Chatroom;
import com.ssafy.hallhole.chat.repository.ChatroomRepository;
import com.ssafy.hallhole.performance.domain.Performance;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatroomServiceImpl implements ChatroomService {

    private final ChatroomRepository chatroomRepository;

    //채팅방 불러오기
    @Override
    @Transactional(readOnly = true)
    public List<Chatroom> findAllRoom() {
        return chatroomRepository.findAllRooms();
    }

    //채팅방 하나 불러오기
    @Override
    @Transactional(readOnly = true)
    public Chatroom findById(String roomId) {
        return chatroomRepository.findRoomById(roomId);
    }

    //채팅방 생성
    @Override
    public void createRoom(Performance performance) {
        Chatroom chatroom = Chatroom.builder()
                .performance(performance)
                .name(performance.getName())
                .openTime(performance.getStartDate())
                .closeTime(performance.getEndDate())
                .memberNameList(new ArrayList<>())
                .build();
        chatroomRepository.save(chatroom);
    }

    @Override
    public void deleteRoom(String id){
        chatroomRepository.closeChatRoom(id);
    }

    @Override
    public void addUser(ChatLog message) {
        Chatroom chatroom = chatroomRepository.findRoomById(message.getPerformanceId());
        chatroom.addUser(message.getMemberNickName());
    }

    @Override
    public void subUser(ChatLog message) {
        Chatroom chatroom = chatroomRepository.findRoomById(message.getPerformanceId());
        chatroom.subUser(message.getMemberNickName());
    }


}
