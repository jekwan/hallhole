package com.ssafy.hallhole.performance.dto;

import com.ssafy.hallhole.performance.domain.Facility;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class FacilitySearchResult {
    private Long facilityCnt;
    private List<Facility> facilities;
}
