package com.ssafy.hallhole.review.repository;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.review.domain.Review;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ReviewRepositoryImpl implements ReviewRepository{

    private final EntityManager em;

    @Override
    public Long save(Review review) {
        em.persist(review);
        return em.createQuery("select r.id from Review r where r.updateTime = (select MAX(updateTime) from Review)",Long.class)
                .getSingleResult();
    }


    @Override
    public Review findOneReviewById(Long id) throws NotFoundException {
        return em.createQuery("select r from Review r where r.isDelete=false and r.id=:id", Review.class)
                .setParameter("id", id)
                .getSingleResult();

    }

    @Override
    public List<Review> findAllByMemberId(Long memberId){
        return em.createQuery("select r from Review r where r.isDelete=false and r.member.id = :member_id",Review.class)
                .setParameter("member_id",memberId)
                .getResultList();

    }

    @Override
    public List<Review> findAllByPerformanceId(String performanceId){
        return em.createQuery("select r from Review r where r.isDelete=false and r.performance.id=:pId",Review.class)
                .setParameter("pId",performanceId)
                .getResultList();
    }

    @Override
    public List<Review> findAllReviewPagingByMemberId(int start, int size, Long memberId) {
        return em.createQuery("select r from Review r where r.isDelete=false and r.member.id=:member_id order by r.updateTime desc ",Review.class)
                .setFirstResult(start)
                .setMaxResults(size)
                .setParameter("member_id",memberId)
                .getResultList();
    }

    @Override
    public List<Review> findAllReviewPagingByPerformanceId(int start, int size, String performanceId) {
        return em.createQuery("select r from Review r where r.isDelete=false and r.performance.id=:pId order by r.updateTime desc ",Review.class)
                .setFirstResult(start)
                .setMaxResults(size)
                .setParameter("pId",performanceId)
                .getResultList();
    }

    @Override
    public Long findCommentCntByReviewId(Long reviewId) {
        return em.createQuery("select count(c.id) from Comment c where c.review.id=:review_id and c.isDelete=false",Long.class)
                .setParameter("review_id",reviewId)
                .getSingleResult();
    }
}
