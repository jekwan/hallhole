package com.ssafy.hallhole.chat.controller;


import com.ssafy.hallhole.chat.domain.Chatroom;
import com.ssafy.hallhole.chat.service.ChatroomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatRoomController {
    private final ChatroomService chatroomService;

    // 모든 채팅방 목록 반환
    @GetMapping("/rooms")
    @ResponseBody
    public List<Chatroom> findRooms() {
        return chatroomService.findAllRoom();
    }

    // 특정 채팅방 조회
    @GetMapping("/room/{roomId}")
    @ResponseBody
    public Chatroom roomInfo(@PathVariable String roomId) {
        return chatroomService.findById(roomId);
    }

    // 채팅방 리스트
    @GetMapping("/room")
    public String rooms(Model model) {
        return "/chat/room";
    }


    // 채팅방 입장 화면
    @GetMapping("/room/enter/{roomId}")
    public String roomDetail(Model model, @PathVariable String roomId) {
        model.addAttribute("roomId", roomId);
        return "/chat/roomdetail";
    }
}