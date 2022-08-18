package com.ssafy.hallhole.chat.controller;

import com.ssafy.hallhole.chat.domain.ChatLog;
import com.ssafy.hallhole.chat.service.ChatLogService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat/logs")
public class ChatLogController {

    private final ChatLogService chatLogService;


    @GetMapping("/{id}")
    @ApiOperation(value = "채팅 로그 가져오기", notes = "'/chat/log/{id}?start=0&size=30' 형식으로 사용")
    public List<ChatLog> find(@PathVariable(name = "id") String id, Pageable pageable) {
        List<ChatLog> msgs = chatLogService.getLogs(id, pageable);
        return msgs;
    }
}
