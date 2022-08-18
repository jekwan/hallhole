package com.ssafy.hallhole.chat.controller;


import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.chat.domain.Chatroom;
import com.ssafy.hallhole.chat.service.ChatroomService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatRoomController {
    private final ChatroomService chatroomService;

    // 모든 채팅방 목록 반환
    @GetMapping("/rooms")
    @ResponseBody
    @ApiOperation(value = "모든 채팅방 목록 가져오기")
    public List<Chatroom> findRooms() {
        return chatroomService.findAllRoom();
    }

    // 특정 채팅방 조회
    @GetMapping("/room/{roomId}")
    @ResponseBody
    @ApiOperation(value = "단일 채팅방 정보")
    public Chatroom roomInfo(@PathVariable String roomId) throws NotFoundException {
        return Optional.ofNullable(chatroomService.findById(roomId)).orElseThrow(() -> new NotFoundException("해당 ID의 채팅방이 없습니다."));
    }

    @GetMapping("/joinedroom/{idTag}")
    @ResponseBody
    @ApiOperation(value = "참여중인 채팅방 목록 가져오기")
    public List<Chatroom> findJoinedRooms(@PathVariable(name = "idTag") String id) {
        return chatroomService.findJoinedRoom(id);
    }

}