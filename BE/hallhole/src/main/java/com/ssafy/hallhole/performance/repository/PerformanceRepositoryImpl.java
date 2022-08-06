package com.ssafy.hallhole.performance.repository;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.performance.domain.DetailPerformance;
import com.ssafy.hallhole.performance.domain.Facility;
import com.ssafy.hallhole.performance.domain.Performance;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class PerformanceRepositoryImpl implements PerformanceRepository {

    private final EntityManager em;

    @Override
    public void save(Performance performance) {
        em.persist(performance);
    }

    @Override
    public void saveDetail(DetailPerformance detailPerformance) {
        em.persist(detailPerformance);
    }

    @Override
    public void saveFacility(Facility facility) {
        em.persist(facility);
    }

    @Override
    public List<Performance> findAllPerformance() {
        return em.createQuery("select p from Performance p",Performance.class)
                .getResultList();
    }

    @Override
    public Performance findOnePerformanceById(String id) throws NotFoundException {
        return Optional.ofNullable(em.find(Performance.class, id)).orElseThrow(() -> new NotFoundException("존재하지 않는 공연 id 입니다."));
    }

    @Override
    public DetailPerformance findOneDetailPerformance(String id) throws NotFoundException {
        return Optional.ofNullable(em.find(DetailPerformance.class, id)).orElseThrow(() -> new NotFoundException("존재하지 않는 공연 id 입니다."));
    }

    @Override
    public List<String> findAllFacility() {
        return em.createQuery("select distinct(f.facility_name) from Performance f",String.class).getResultList();
    }

    @Override
    public Facility findOneFacility(String id) throws NotFoundException {

        return Optional.ofNullable(em.find(Facility.class, id)).orElseThrow(()-> new NotFoundException("존재하지 않는 극장 id 입니다."));
    }

    @Override
    public List<Performance> findAllPerformancePaging(int start, int size) {
        return em.createQuery("select p from Performance p order by p.startDate desc ",Performance.class)
                .setFirstResult(start)
                .setMaxResults(size)
                .getResultList();

    }

    public List<Facility> findAllFacilityPaging(int start, int size) {
        return em.createQuery("select f from Facility f",Facility.class)
                .setFirstResult(start)
                .setMaxResults(size)
                .getResultList();
    }

    @Override
    public List<Performance> findDetailIsNull() {
        return em.createQuery("select p from Performance p left outer join DetailPerformance d on p.id = d.performance where d.performance is null ",Performance.class).getResultList();
    }

    @Override
    public List<Performance> findPerformancesByNamePaging(int start, int size, String name) {
        return em.createQuery("select p from Performance p where p.name like :name ",Performance.class)
                .setParameter("name","%"+name+"%")
                .setFirstResult(start)
                .setMaxResults(size)
                .getResultList();
    }

    @Override
    public List<Facility> findFacilitiesByPerformanceName(int start, int size, String name) {
        return em.createQuery("select distinct (d.facility) from DetailPerformance d where d.performance.name like :name",Facility.class)
                .setParameter("name","%"+name+"%")
                .setFirstResult(start)
                .setMaxResults(size)
                .getResultList();
    }
    @Override
    public Long findFacilitiesCntByPerformanceName(String name){
        return em.createQuery("select count( distinct d.facility) from DetailPerformance d where d.performance.name like :name",Long.class)
                .setParameter("name","%"+name+"%")
                .getSingleResult();
    }

    @Override
    public List<Performance> findRunningPerformances() {
        return em.createQuery("select p from Performance p where current_date between p.startDate and p.endDate").getResultList();
    }

    @Override
    public Long getPerformanceCntByName(String name) {
        return em.createQuery("select count(p) from Performance p where p.name like :name ",Long.class)
                .setParameter("name","%"+name+"%")
                .getSingleResult();
    }
}
