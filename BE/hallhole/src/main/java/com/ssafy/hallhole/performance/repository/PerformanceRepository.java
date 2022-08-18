package com.ssafy.hallhole.performance.repository;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.performance.domain.DetailPerformance;
import com.ssafy.hallhole.performance.domain.Facility;
import com.ssafy.hallhole.performance.domain.Performance;

import java.util.List;

public interface PerformanceRepository {

    void save(Performance performance);

    void saveDetail(DetailPerformance detailPerformance);

    void saveFacility(Facility facility);

    List<Performance> findAllPerformance();

    Performance findOnePerformanceById(String id) throws NotFoundException;

    DetailPerformance findOneDetailPerformance(String id) throws NotFoundException;

    List<String> findAllFacility();

    Facility findOneFacility(String id) throws NotFoundException;

    List<Performance> findAllPerformancePaging(int start, int size);

    List<Facility> findAllFacilityPaging(int start, int size);

    List<Performance> findDetailIsNull();

    List<Performance> findPerformancesByNamePaging(int start, int size, String name);

    List<Facility> findFacilitiesByPerformanceName(int start, int size, String name);

    Long findFacilitiesCntByPerformanceName(String name);

    List<Performance> findRunningPerformances();

    Long getPerformanceCntByName(String name);


    Long getImageCnt();

    String getRandomImage(int count);
}
