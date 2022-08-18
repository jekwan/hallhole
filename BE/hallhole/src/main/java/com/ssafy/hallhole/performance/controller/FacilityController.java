package com.ssafy.hallhole.performance.controller;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.performance.domain.Facility;
import com.ssafy.hallhole.performance.dto.FacilitySearchResult;
import com.ssafy.hallhole.performance.service.PerformanceService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/facility")
public class FacilityController {

    private final PerformanceService performanceService;

    @GetMapping
    @ApiOperation(value = "공연장 리스트 페이징",notes = "'/facility/{facility-id}?start=0&size=30' 형식으로 사용")
    public List<Facility> getFacilitiesPaging(@RequestParam("start") int start,@RequestParam("size") int size){
        return performanceService.getFacilities(start,size);
    }

    @GetMapping("/{id}")
    @ApiOperation(value = "공연장 상세정보")
    public Facility getFacilityDetail(@PathVariable(name = "id") String id) throws NotFoundException {
        return performanceService.getOneFacility(id);
    }

    @GetMapping("/search/{name}")
    @ApiOperation(value = "공연장 검색 페이징",notes = "'/facility/search/{name}?start=0&size=30' 형식으로 사용, '뽀로로' 검색시 뽀로로 관련 연극/뮤지컬을 공연한 극장을 나타냄")
    public FacilitySearchResult searchFacilityByName(@RequestParam("start") int start, @RequestParam("size") int size, @PathVariable("name") String name) {
        FacilitySearchResult facilitySearchResult = FacilitySearchResult.builder()
                .facilities(performanceService.findFacilitiesByPerformanceName(start, size, name))
                .facilityCnt(performanceService.findFacilitiesCntByPerformanceName(name))
                .build();
        return facilitySearchResult;

    }
}
