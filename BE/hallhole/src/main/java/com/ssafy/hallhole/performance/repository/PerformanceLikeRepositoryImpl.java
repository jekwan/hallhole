package com.ssafy.hallhole.performance.repository;

import com.ssafy.hallhole.performance.domain.PerformanceLike;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class PerformanceLikeRepositoryImpl implements PerformanceLikeRepository {

    private final EntityManager em;

    @Override
    public void save(PerformanceLike pLike) {
        em.persist(pLike);
    }

    @Override
    public void delete(PerformanceLike pLike) {
        em.remove(pLike);
    }

    @Override
    public List<PerformanceLike> findByAllData(String pid, Long uid) {
        return em.createQuery("select p from PerformanceLike p where p.performance.id=:pid and " +
                "p.member.id=:uid", PerformanceLike.class)
                .setParameter("pid", pid)
                .setParameter("uid", uid)
                .getResultList();
    }

    @Override
    public Long findByPerformanceId(String pid) {
        return em
                .createQuery("select count(p.member.id) from PerformanceLike p where p.performance.id=:pid", Long.class)
                .setParameter("pid", pid)
                .getSingleResult();
    }

    @Override
    public List<String> findAllPerformanceLikePagingByMemberId(int start, int size, Long uid) {
        return em.createQuery("select p.performance.id from PerformanceLike p where p.member.id=:uid", String.class)
                .setFirstResult(start)
                .setMaxResults(size)
                .setParameter("uid", uid)
                .getResultList();
    }

    @Override
    public List<String> findPopularPerformance(int size) {
        return em.createQuery(
                "select p.performance.id from PerformanceLike p group by p.performance.id order by count(p.performance.id) desc, p.performance.startDate asc",
                String.class)
                .setFirstResult(0)
                .setMaxResults(size)
                .getResultList();
    }

    @Override
    public Long isLike(String pid, Long uid) {
        return em.createQuery(
                "select count(p.performance.id) from PerformanceLike p where p.performance.id=:pid and p.member.id=:uid",
                Long.class)
                .setParameter("pid", pid)
                .setParameter("uid", uid)
                .getSingleResult();
    }

    @Override
    public Long likeCnt(Long uid) {
        return em
                .createQuery("select count(p.performance.id) from PerformanceLike p where p.member.id = :uid",
                        Long.class)
                .setParameter("uid", uid)
                .getSingleResult();
    }

    @Override
    public List<PerformanceLike> findMyLikeListById(Long uid) {
        return em.createQuery("select p from PerformanceLike p where p.member.id=:uid", PerformanceLike.class)
                .setParameter("uid", uid)
                .getResultList();
    }
}
