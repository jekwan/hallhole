package com.ssafy.hallhole.chat.service;

import com.ssafy.hallhole.chat.domain.ChatLog;
import com.ssafy.hallhole.chat.domain.Chatroom;
import com.ssafy.hallhole.performance.domain.Performance;

import java.util.List;

public interface ChatroomService {
    //채팅방 불러오기
    List<Chatroom> findAllRoom();

    //채팅방 하나 불러오기
    Chatroom findById(String roomId);

    //채팅방 생성
    void createRoom(Performance performance);

    void deleteRoom(String id);

    void addUser(ChatLog message);

    void subUser(ChatLog message);

    List<Chatroom> findJoinedRoom(String id);

    void outJoinedChatRoom(String idTag);
}
