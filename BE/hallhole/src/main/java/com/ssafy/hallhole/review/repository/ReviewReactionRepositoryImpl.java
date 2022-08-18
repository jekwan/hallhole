package com.ssafy.hallhole.review.repository;

import com.ssafy.hallhole.review.domain.ReactionType;
import com.ssafy.hallhole.review.domain.ReviewReaction;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ReviewReactionRepositoryImpl implements ReviewReactionRepository {

    private final EntityManager em;

    @Override
    public void save(ReviewReaction reaction) {
        em.persist(reaction);
    }

    @Override
    public void save(ReactionType reactionType) {
        em.persist(reactionType);
    }

    @Override
    public Long findSameReactionName(String rTypeName) {
        return em.createQuery("select count(r.id) from ReactionType r where r.name=:rName",Long.class)
                .setParameter("rName",rTypeName)
                .getSingleResult();
    }


    @Override
    public void delete(ReviewReaction reaction) {
        em.remove(reaction);
    }

    @Override
    public Long findSameReviewReaction(Long rId, Long mId) {
        return em.createQuery("select count(r.member.id) from ReviewReaction r where r.review.id=:rId and r.member.id=:mId",Long.class)
                .setParameter("rId",rId)
                .setParameter("mId",mId)
                .getSingleResult();

    }

    @Override
    public List<ReviewReaction> findReactionByAllData(Long rId, Long mId) {
        return em.createQuery("select r from ReviewReaction r where r.review.id=:rId and r.member.id=:mId",ReviewReaction.class)
                .setParameter("rId",rId)
                .setParameter("mId",mId)
                .getResultList();
    }

    @Override
    public List<ReviewReaction> findAllByMemberId(int start, int size, Long memberId) {
        return em.createQuery("select r from ReviewReaction r where r.member.id=:memberId",ReviewReaction.class)
                .setParameter("memberId",memberId)
                .setFirstResult(start)
                .setMaxResults(size)
                .getResultList();
    }

    @Override
    public List<ReviewReaction> findAllByReveiwId(Long reviewId) {
        return em.createQuery("select r from ReviewReaction r where r.review.id=:reviewId",ReviewReaction.class)
                .setParameter("reviewId",reviewId)
                .getResultList();
    }

    @Override
    public ReactionType getReactionInfo(int reactionId) {
        return em.createQuery("select r from ReactionType r where r.id=:reactionId", ReactionType.class)
                .setParameter("reactionId", reactionId)
                .getSingleResult();
    }

    @Override
    public List<ReviewReaction> findAllReactionByMemberId(Long memberId) {
        return em.createQuery("select r from ReviewReaction r where r.member.id=:memberId",ReviewReaction.class)
                .setParameter("memberId",memberId)
                .getResultList();
    }

}
