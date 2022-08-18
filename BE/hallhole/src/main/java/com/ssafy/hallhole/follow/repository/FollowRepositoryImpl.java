package com.ssafy.hallhole.follow.repository;

import com.ssafy.hallhole.follow.domain.Follow;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class FollowRepositoryImpl implements FollowRepository{

    private final EntityManager em;

    @Override
    public void save(Follow follow) {
        em.persist(follow);
    }

    @Override
    public void delete(Follow follow) {
        em.remove(follow);
    }

    @Override
    public Follow findRelation(Long ing_id, Long ed_id) {
        return em.createQuery("select f from Follow f where f.followingMember.id=:ing_id and f.followedMember.id=:ed_id", Follow.class)
                .setParameter("ing_id",ing_id)
                .setParameter("ed_id",ed_id)
                .getSingleResult();
    }

    @Override
    public List<Follow> findRelationInMember(Long ing_id, Long ed_id) {
        return em.createQuery("select f from Follow f where f.followingMember.id=:ing_id and f.followedMember.id=:ed_id", Follow.class)
                .setParameter("ing_id",ing_id)
                .setParameter("ed_id",ed_id)
                .getResultList();
    }

    @Override
    public List<Follow> findByFollowingMemberId(int start, int size, Long ing_id) {
        return em.createQuery("select f from Follow f where f.followingMember.id=:ing_id", Follow.class)
                .setParameter("ing_id",ing_id)
                .setFirstResult(start)
                .setMaxResults(size)
                .getResultList();
    }

    @Override
    public List<Follow> findByFollowedMemberId(int start, int size, Long ed_id) {
        return em.createQuery("select f from Follow f where f.followedMember.id=:ed_id", Follow.class)
                .setParameter("ed_id",ed_id)
                .setFirstResult(start)
                .setMaxResults(size)
                .getResultList();
    }

    @Override
    public List<Follow> findAllRelationByMemberId(Long id) {
        return em.createQuery("select f from Follow f where f.followingMember.id=:id or f.followedMember.id=:id", Follow.class)
                .setParameter("id",id)
                .getResultList();
    }


}
