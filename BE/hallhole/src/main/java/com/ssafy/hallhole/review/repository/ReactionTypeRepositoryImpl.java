package com.ssafy.hallhole.review.repository;

import com.ssafy.hallhole.review.domain.ReactionType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ReactionTypeRepositoryImpl implements ReactionTypeRepository{

    private final EntityManager em;

    @Override
    public List<ReactionType> showReactionList() {
        return em.createQuery("select rt from ReactionType rt",ReactionType.class)
                .getResultList();
    }
}
