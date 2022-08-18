package com.ssafy.hallhole.performance.service;

import com.ssafy.hallhole.performance.domain.DetailPerformance;
import com.ssafy.hallhole.performance.domain.Facility;
import com.ssafy.hallhole.performance.domain.Performance;
import com.ssafy.hallhole.performance.domain.PerformanceImage;
import com.ssafy.hallhole.performance.repository.PerformanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PerformanceDataServiceImpl implements PerformanceDataService {

    private final PerformanceRepository performanceRepository;

    private final Environment env;

    @Override
    @Scheduled(cron = "0 0 3 * * *")
    public void scheduledData() throws Exception {
        getPerformanceData("AAAA", 1, 100);
        getPerformanceData("AAAB", 1, 100);
        getDetails();
    }

    @Override
    public void getDetails() throws Exception {
        //detail 정보가 없는것만 가져오기
        List<Performance> performanceList = performanceRepository.findDetailIsNull();
        for (Performance performance : performanceList) {
            getDetailPerformanceDataByPerformanceId(performance);
        }

    }

    private void getDetailPerformanceDataByPerformanceId(Performance performance) throws Exception {
        String urlstr = "http://www.kopis.or.kr/openApi/restful/pblprfr/" + performance.getId() + "?service=" + env.getProperty("kopisApiKey");
        DocumentBuilderFactory dbFactoty = DocumentBuilderFactory.newInstance();
        DocumentBuilder dBuilder = dbFactoty.newDocumentBuilder();
        Document doc = dBuilder.parse(urlstr);

        doc.getDocumentElement().normalize();
        NodeList nList = doc.getElementsByTagName("db");
        Node nNode = nList.item(0);
        NodeList items = nNode.getChildNodes();
        HashMap<String, String> map = new HashMap();
        List<PerformanceImage> urls = new ArrayList<>();
        for (int i = 0; i < items.getLength(); i++) {
            if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                Node node = items.item(i);
                if (node.getNodeName().equals("prfcast")) {
                    map.put("cast", node.getTextContent());
                } else if (node.getNodeName().equals("prfruntime")) {
                    map.put("runtime", node.getTextContent());
                } else if (node.getNodeName().equals("mt10id")) {
                    map.put("facility_id", node.getTextContent());
                } else if (node.getNodeName().equals("entrpsnm")) {
                    map.put("company", node.getTextContent());
                } else if (node.getNodeName().equals("pcseguidance")) {
                    map.put("price", node.getTextContent());
                } else if (node.getNodeName().equals("styurls")) {
                    NodeList images = node.getChildNodes();
                    int num = 1;
                    for (int j = 0; j < images.getLength(); j++) {
                        if (images.item(j).getNodeName().equals("styurl")) {
                            PerformanceImage performanceImage = PerformanceImage.builder().performance(performance).sortingNum(num).url(images.item(j).getTextContent()).build();
                            urls.add(performanceImage);
                            num++;
                        }

                    }
                }
            }
        }
        Facility facility = performanceRepository.findOneFacility(map.get("facility_id"));
        if (facility == null) {
            facility = getFacilityDetailData(map.get("facility_id"));
            performanceRepository.saveFacility(facility);
        }
        DetailPerformance detailPerformance = DetailPerformance.builder().performance(performance).actor(map.get("cast")).runtime(map.get("runtime")).productionCompany(map.get("company")).facility(facility).price(map.get("price")).images(urls).build();
        performanceRepository.saveDetail(detailPerformance);
    }

    @Override
    public void initData() throws Exception {
        getPerformanceData("AAAA", 2, 1000);
        getPerformanceData("AAAB", 2, 1000);
        getFacilityData();
        getDetailPerformanceData();
    }

    @Override
    public void getPerformanceData(String type, int num, int rows) throws Exception {
        for (int pg_num = 1; pg_num <= num; pg_num++) {

            String urlstr = "http://www.kopis.or.kr/openApi/restful/pblprfr?service=" + env.getProperty("kopisApiKey") + "&shcate=" + type + "&rows=" + rows + "&cpage=" + pg_num;

            DocumentBuilderFactory dbFactoty = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactoty.newDocumentBuilder();
            Document doc = dBuilder.parse(urlstr);

            doc.getDocumentElement().normalize();
            NodeList nList = doc.getElementsByTagName("db");

            for (int temp = 0; temp < nList.getLength(); temp++) {
                Node nNode = nList.item(temp);
                NodeList items = nNode.getChildNodes();
                HashMap<String, String> map = new HashMap();
                for (int i = 0; i < items.getLength(); i++) {
                    if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                        Node node = items.item(i);
                        if (node.getNodeName().equals("mt20id")) {
                            map.put("id", node.getTextContent());
                        } else if (node.getNodeName().equals("prfnm")) {
                            map.put("name", node.getTextContent());
                        } else if (node.getNodeName().equals("prfpdfrom")) {
                            map.put("from", node.getTextContent());
                        } else if (node.getNodeName().equals("prfpdto")) {
                            map.put("to", node.getTextContent());
                        } else if (node.getNodeName().equals("fcltynm")) {
                            map.put("facility_name", node.getTextContent());
                        } else if (node.getNodeName().equals("poster")) {
                            map.put("poster", node.getTextContent());
                        } else if (node.getNodeName().equals("genrenm")) {
                            map.put("genre", node.getTextContent());
                        }
                    }
                }
                if (performanceRepository.findOnePerformanceById(map.get("id")) == null) {

                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");
                    LocalDateTime startDate = LocalDate.from(LocalDate.parse(map.get("from"), formatter)).atStartOfDay();
                    LocalDateTime endDate = LocalDate.from(LocalDate.parse(map.get("to"), formatter)).atStartOfDay();

                    Performance performance = Performance.builder().id(map.get("id")).name(map.get("name")).startDate(startDate).endDate(endDate).facility_name(map.get("facility_name")).poster(map.get("poster")).genre(map.get("genre")).build();
                    performanceRepository.save(performance);
                }
            }
        }
    }

    @Override
    public void getFacilityData() throws Exception {

        String urlstr = "http://www.kopis.or.kr/openApi/restful/prfplc?service=" + env.getProperty("kopisApiKey") + "&rows=3000" + "&cpage=1";

        DocumentBuilderFactory dbFactoty = DocumentBuilderFactory.newInstance();
        DocumentBuilder dBuilder = dbFactoty.newDocumentBuilder();
        Document doc = dBuilder.parse(urlstr);

        doc.getDocumentElement().normalize();
        NodeList nList = doc.getElementsByTagName("db");

        for (int temp = 0; temp < nList.getLength(); temp++) {
            Node nNode = nList.item(temp);
            NodeList items = nNode.getChildNodes();
            for (int i = 0; i < items.getLength(); i++) {
                if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                    Node node = items.item(i);
                    if (node.getNodeName().equals("mt10id")) {
                        if (performanceRepository.findOneFacility(node.getTextContent()) == null) {
                            Facility facility = getFacilityDetailData(node.getTextContent());
                            performanceRepository.saveFacility(facility);
                        }
                    }
                }
            }
        }
    }

    @Override
    public Facility getFacilityDetailData(String id) throws Exception {
        String urlstr = "http://www.kopis.or.kr/openApi/restful/prfplc/" + id + "?service=" + env.getProperty("kopisApiKey");
        DocumentBuilderFactory dbFactoty = DocumentBuilderFactory.newInstance();
        DocumentBuilder dBuilder = dbFactoty.newDocumentBuilder();
        Document doc = dBuilder.parse(urlstr);

        doc.getDocumentElement().normalize();
        NodeList nList = doc.getElementsByTagName("db");
        Node nNode = nList.item(0);
        NodeList items = nNode.getChildNodes();
        HashMap<String, String> map = new HashMap();
        for (int i = 0; i < items.getLength(); i++) {
            if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                Node node = items.item(i);
                if (node.getNodeName().equals("mt10id")) {
                    map.put("id", node.getTextContent());
                } else if (node.getNodeName().equals("fcltynm")) {
                    map.put("name", node.getTextContent());
                } else if (node.getNodeName().equals("adres")) {
                    map.put("addr", node.getTextContent());
                } else if (node.getNodeName().equals("la")) {
                    map.put("la", node.getTextContent());
                } else if (node.getNodeName().equals("lo")) {
                    map.put("lo", node.getTextContent());
                }
            }
        }
        Facility facility = Facility.builder().id(map.get("id")).addr(map.get("addr")).name(map.get("name")).lat(Double.valueOf(map.get("la"))).lon(Double.valueOf(map.get("lo"))).build();
        return facility;
    }

    @Override
    public void getDetailPerformanceData() throws Exception {
        List<Performance> performanceList = performanceRepository.findAllPerformance();
        for (Performance performance : performanceList) {
            if (performanceRepository.findOneDetailPerformance(performance.getId()) == null) {
                String urlstr = "http://www.kopis.or.kr/openApi/restful/pblprfr/" + performance.getId() + "?service=" + env.getProperty("kopisApiKey");
                DocumentBuilderFactory dbFactoty = DocumentBuilderFactory.newInstance();
                DocumentBuilder dBuilder = dbFactoty.newDocumentBuilder();
                Document doc = dBuilder.parse(urlstr);

                doc.getDocumentElement().normalize();
                NodeList nList = doc.getElementsByTagName("db");
                Node nNode = nList.item(0);
                NodeList items = nNode.getChildNodes();
                HashMap<String, String> map = new HashMap();
                List<PerformanceImage> urls = new ArrayList<>();
                for (int i = 0; i < items.getLength(); i++) {
                    if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                        Node node = items.item(i);
                        if (node.getNodeName().equals("prfcast")) {
                            map.put("cast", node.getTextContent());
                        } else if (node.getNodeName().equals("prfruntime")) {
                            map.put("runtime", node.getTextContent());
                        } else if (node.getNodeName().equals("mt10id")) {
                            map.put("facility_id", node.getTextContent());
                        } else if (node.getNodeName().equals("entrpsnm")) {
                            map.put("company", node.getTextContent());
                        } else if (node.getNodeName().equals("pcseguidance")) {
                            map.put("price", node.getTextContent());
                        } else if (node.getNodeName().equals("styurls")) {
                            NodeList images = node.getChildNodes();
                            int num = 1;
                            for (int j = 0; j < images.getLength(); j++) {
                                if (images.item(j).getNodeName().equals("styurl")) {
                                    PerformanceImage performanceImage = PerformanceImage.builder().performance(performance).sortingNum(num).url(images.item(j).getTextContent()).build();
                                    urls.add(performanceImage);
                                    num++;
                                }

                            }
                        }
                    }
                }
                Facility facility = performanceRepository.findOneFacility(map.get("facility_id"));
                if (facility == null) {
                    facility = getFacilityDetailData(map.get("facility_id"));
                    performanceRepository.saveFacility(facility);
                }
                DetailPerformance detailPerformance = DetailPerformance.builder().performance(performance).actor(map.get("cast")).runtime(map.get("runtime")).productionCompany(map.get("company")).facility(facility).price(map.get("price")).images(urls).build();
                performanceRepository.saveDetail(detailPerformance);
            }
        }
    }
}
