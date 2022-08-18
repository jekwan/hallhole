package com.ssafy.hallhole.review.repository;

import com.ssafy.hallhole.review.domain.ReactionCnt;
import com.ssafy.hallhole.review.domain.ReactionType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ReactionCntRepositoryImpl implements ReactionCntRepository {

    private final EntityManager em;

    @Override
    public void save(ReactionCnt reactionCnt) {
        em.persist(reactionCnt);
    }

    @Override
    public void delete(ReactionCnt reactionCnt) {
        em.remove(reactionCnt);
    }

    @Override
    public Long findReactionByReviewId(Long rId, int rTypeId) {
        return em.createQuery("select count(c.id) from ReactionCnt c where c.review.id=:rId and c.reactiontype.id=:typeId",Long.class)
                .setParameter("rId",rId)
                .setParameter("typeId", rTypeId)
                .getSingleResult();
    }

    @Override
    public ReactionCnt findReactionCnt(Long rId, int rTypeId) {
        return em.createQuery("select c from ReactionCnt c where c.review.id=:rId and c.reactiontype.id=:typeId",ReactionCnt.class)
                .setParameter("rId",rId)
                .setParameter("typeId", rTypeId)
                .getSingleResult();
    }


}
