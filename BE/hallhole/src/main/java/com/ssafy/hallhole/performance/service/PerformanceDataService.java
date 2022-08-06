package com.ssafy.hallhole.performance.service;

import com.ssafy.hallhole.performance.domain.Facility;

public interface PerformanceDataService {

    void scheduledData() throws Exception;

    void getDetails() throws Exception;

    void initData() throws Exception;

    void getPerformanceData(String type, int num, int rows) throws Exception;

    void getFacilityData() throws Exception;

    Facility getFacilityDetailData(String id) throws Exception;

    void getDetailPerformanceData() throws Exception;
}
