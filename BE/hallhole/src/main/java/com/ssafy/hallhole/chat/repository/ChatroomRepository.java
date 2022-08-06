package com.ssafy.hallhole.chat.repository;

import com.ssafy.hallhole.chat.domain.Chatroom;

import java.util.List;

public interface ChatroomRepository {
    List<Chatroom> findAllRooms();

    Chatroom findRoomById(String roomId);

    void save(Chatroom chatroom);

    void closeChatRoom(String id);
}
