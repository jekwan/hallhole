package com.ssafy.hallhole.performance.service;

import com.ssafy.hallhole.performance.domain.DetailPerformance;
import com.ssafy.hallhole.performance.domain.Performance;
import com.ssafy.hallhole.performance.repository.PerformanceRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.util.List;

@SpringBootTest
@Transactional
class PerformanceServiceImplTest {

    @Autowired
    PerformanceDataService performanceService;

    @Autowired
    PerformanceRepository performanceRepository;

    @Autowired
    Environment env;

    @Test
    @Rollback(false)
    void initData() throws Exception {
        performanceService.initData();
    }

    @Test
    @Rollback(false)
    void singleTest() throws Exception {
        performanceService.getDetailPerformanceData();
    }

    @Test
    void apiTest() throws Exception {
        String urlstr = "http://www.kopis.or.kr/openApi/restful/prfstsTotal?service=" + env.getProperty("kopisApiKey") + "&ststype=day&stdate=202208";

        DocumentBuilderFactory dbFactoty = DocumentBuilderFactory.newInstance();
        DocumentBuilder dBuilder = dbFactoty.newDocumentBuilder();
        Document doc = dBuilder.parse(urlstr);

        doc.getDocumentElement().normalize();
        NodeList nList = doc.getElementsByTagName("prfst");
        System.out.println(nList);
    }

    @Test
    void test(){
        List<Performance> runningPerformances = performanceRepository.findRunningPerformances();
        System.out.println("runningPerformances = " + runningPerformances);
        System.out.println("cnt = " + runningPerformances.size());

    }

}