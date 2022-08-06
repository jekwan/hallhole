package com.ssafy.hallhole.performance.controller;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.performance.domain.DetailPerformance;
import com.ssafy.hallhole.performance.domain.Performance;
import com.ssafy.hallhole.performance.dto.PerformanceSearchResult;
import com.ssafy.hallhole.performance.service.PerformanceService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/performance")
public class PerformanceController {
    private final PerformanceService performanceService;

    @GetMapping
    @ApiOperation(value = "공연 리스트 페이징",notes = "'/performance?start=0&size=30' 형식으로 사용")
    public List<Performance> getPerformances(@RequestParam("start") int start, @RequestParam("size") int size) {
        return performanceService.getPerformances(start, size);
    }

    @GetMapping("/{id}")
    @ApiOperation(value = "공연 세부 정보",notes = "'/performance/{performance-id}")
    public DetailPerformance getPerformanceDetail(@PathVariable("id") String id) throws NotFoundException {
        return performanceService.getDetail(id);
    }

    @GetMapping("/search/{name}")
    @ApiOperation(value = "공연 검색",notes = "'/performance/search/{name}?start=0&size=20' 형식으로 사용")
    public PerformanceSearchResult searchPerformanceByName(@RequestParam("start") int start, @RequestParam("size") int size, @PathVariable("name") String name) {
        PerformanceSearchResult performanceSearchResult = PerformanceSearchResult.builder()
                .performances(performanceService.findPerformancesByName(start,size,name))
                .PerformancesCnt(performanceService.getPerformancesCntByName(name))
                .build();
        return performanceSearchResult;
    }


    @GetMapping("/test")
    @ApiOperation(value = "공연 시간 체크 후 채팅방 생성 삭제 테스트용 메서드 -> 삭제 예정")
    public void createTest(){
        performanceService.scheduledOpenAndCloseChat();
    }

}
