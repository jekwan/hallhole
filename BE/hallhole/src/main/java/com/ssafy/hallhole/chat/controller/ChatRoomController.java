package com.ssafy.hallhole.chat.controller;


import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.chat.domain.Chatroom;
import com.ssafy.hallhole.chat.service.ChatroomService;
import com.ssafy.hallhole.performance.domain.Performance;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDateTime;
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

    // 채팅방 리스트
    @GetMapping("/room")
    @ApiOperation(value = "채팅방 목록 페이지 이동 메서드 -> react와 병합후 삭제 예정")
    public String rooms(Model model) {
        return "/chat/room";
    }


    // 채팅방 입장 화면
    @GetMapping("/room/enter/{roomId}")
    @ApiOperation(value = "채팅방 입장 메서드 -> react와 병합후 삭제 예정")
    public String roomDetail(Model model, @PathVariable String roomId) {
        model.addAttribute("roomId", roomId);
        return "/chat/roomdetail";
    }

    @GetMapping("/make")
    @ResponseBody
    @ApiOperation(value = "채팅방 생성 테스트용 메서드 -> 삭제 예정")
    public void makeRoomTest() {
        Performance performance = Performance.builder().name("테스트").facility_name("test").endDate(LocalDateTime.now())
                .startDate(LocalDateTime.now()).id("PF183213").genre("연극").poster("url").build();
        chatroomService.createRoom(performance);
    }

    @GetMapping("/delete")
    @ResponseBody
    @ApiOperation(value = "채팅방 삭제 테스트용 메서드 -> 삭제 예정")
    public void deleteRoomTest() {
        chatroomService.deleteRoom("PF183213");
    }
}