package com.ssafy.hallhole.report.repository;

import com.ssafy.hallhole.report.domain.Report;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;

public interface ReportRepository {

    // 저장
    void save(Report report);

    // 전체 목록 불러오기
    List<Report> findAllList();

    // 같은 reporter, 같은 reported 5분 이내 찾기
    Long findSameReport(String erTag, String edTag, LocalDateTime now);

}
