package com.ssafy.hallhole.performance.dto;

import com.ssafy.hallhole.performance.domain.Performance;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class PerformanceSearchResult {
    private Long PerformancesCnt;
    private List<Performance> performances;
}
