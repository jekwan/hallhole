package com.ssafy.hallhole.report.repository;

import com.ssafy.hallhole.report.domain.Report;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ReportRepositoryImpl implements ReportRepository{

    private final EntityManager em;


    @Override
    public void save(Report report) {
        em.persist(report);
    }

    @Override
    public List<Report> findAllList() {
        return em.createQuery("select r from Report r",Report.class)
                .getResultList();
    }
    @Override
    public Long findSameReport(String erTag, String edTag, LocalDateTime now) {
        return em.createQuery("select count(r.id) from Report r where r.member.idTag=:erTag and r.respondentMember.idTag=:edTag and r.dateTime>:now",Long.class)
                .setParameter("erTag",erTag)
                .setParameter("edTag", edTag)
                .setParameter("now", now.minusMinutes(5))
                .getSingleResult();
    }
}
