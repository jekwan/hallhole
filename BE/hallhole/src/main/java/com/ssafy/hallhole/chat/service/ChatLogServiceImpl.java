package com.ssafy.hallhole.chat.service;

import com.ssafy.hallhole.chat.domain.ChatLog;
import com.ssafy.hallhole.chat.repository.ChatLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatLogServiceImpl implements ChatLogService {

    private final ChatLogRepository chatLogRepository;


    @Override
    public ChatLog saveChat(ChatLog chatLog) {
        return chatLogRepository.save(chatLog);
    }

    @Override
    public List<ChatLog> getLogs(String id, Pageable pageable) {
        return chatLogRepository.findAllChatLogByPerformanceIdOrderByMessageTimeDesc(id,pageable);
    }
}
