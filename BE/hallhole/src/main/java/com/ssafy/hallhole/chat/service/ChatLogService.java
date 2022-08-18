package com.ssafy.hallhole.chat.service;

import com.ssafy.hallhole.chat.domain.ChatLog;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ChatLogService {

    ChatLog saveChat(ChatLog chatLog);

    List<ChatLog> getLogs(String roomId, Pageable pageable);
}
