package com.ssafy.hallhole.chat.repository;

import com.ssafy.hallhole.chat.domain.Chatroom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class ChatroomRepositoryImpl implements ChatroomRepository{

    private final EntityManager em;

    @Override
    public List<Chatroom> findAllRooms() {
        return em.createQuery("select c from Chatroom c",Chatroom.class).getResultList();
    }

    @Override
    public Chatroom findRoomById(String roomId) {
        return em.find(Chatroom.class,roomId);
    }

    @Override
    public void save(Chatroom chatroom) {
        em.persist(chatroom);
    }

    @Override
    public void closeChatRoom(String id) {
        em.createQuery("delete from Chatroom c where c.performance.id = :id").setParameter("id",id).executeUpdate();
    }
}
