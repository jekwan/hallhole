package com.ssafy.hallhole.performance.service;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.chat.domain.Chatroom;
import com.ssafy.hallhole.chat.service.ChatroomService;
import com.ssafy.hallhole.performance.domain.DetailPerformance;
import com.ssafy.hallhole.performance.domain.Facility;
import com.ssafy.hallhole.performance.domain.Performance;
import com.ssafy.hallhole.performance.repository.PerformanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PerformanceServiceImpl implements PerformanceService {

    private final PerformanceRepository performanceRepository;

    private final ChatroomService chatroomService;

    @Override
    public List<Performance> getPerformances(int start, int size) {
        return performanceRepository.findAllPerformancePaging(start, size);
    }

    @Override
    public List<Facility> getFacilities(int start, int size) {
        return performanceRepository.findAllFacilityPaging(start, size);
    }

    @Override
    public Performance findOnePerformance(String id) throws NotFoundException {
        return performanceRepository.findOnePerformanceById(id);
    }

    @Override
    public DetailPerformance getDetail(String id) throws NotFoundException {
        return performanceRepository.findOneDetailPerformance(id);
    }

    @Override
    public Facility getOneFacility(String id) throws NotFoundException {
        return performanceRepository.findOneFacility(id);
    }


    @Override
    @Scheduled(cron = "0 0 1 * * *")
    @Transactional
    public void scheduledOpenAndCloseChat() {
        List<Chatroom> openChatRooms = chatroomService.findAllRoom();
        // 지난 채팅방 삭제
        for (int i = 0; i < openChatRooms.size(); i++) {
            Chatroom chatroom = openChatRooms.get(i);
            if (chatroom.getCloseTime().plusDays(1).isBefore(LocalDateTime.now())) {
                chatroomService.deleteRoom(chatroom.getPerformance().getId());
            }
        }
        List<Performance> runningPerformances = performanceRepository.findRunningPerformances();
        for (int i = 0; i < runningPerformances.size(); i++) {
            //채팅방 없으면 생성
            Performance performance = runningPerformances.get(i);
            if (chatroomService.findById(performance.getId()) == null) {
                chatroomService.createRoom(performance);
            }
        }
    }

    @Override
    public List<Performance> findPerformancesByName(int start, int size, String name) {
        return performanceRepository.findPerformancesByNamePaging(start, size, name);
    }

    @Override
    public List<Facility> findFacilitiesByPerformanceName(int start, int size, String name) {
        return performanceRepository.findFacilitiesByPerformanceName(start, size, name);
    }

    @Override
    public Long getPerformancesCntByName(String name) {
        return performanceRepository.getPerformanceCntByName(name);
    }

    @Override
    public Long findFacilitiesCntByPerformanceName(String name) {
        return performanceRepository.findFacilitiesCntByPerformanceName(name);
    }

    @Override
    public List<String> getRandomImages() {
        Long cnt = performanceRepository.getImageCnt();
        List<String> imgs = new ArrayList<>();
        for (int i = 0; i < 15; i++) {
            imgs.add(performanceRepository.getRandomImage(Math.toIntExact(cnt)));
        }
        return imgs;
    }

}
