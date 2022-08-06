package com.ssafy.hallhole.chat.repository;

import com.ssafy.hallhole.chat.domain.ChatLog;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatLogRepository extends MongoRepository<ChatLog, String> {

    ChatLog save(ChatLog chatLog);

    List<ChatLog> findAllChatLogByPerformanceIdOrderByMessageTimeDesc(String id, Pageable pageable);

}
