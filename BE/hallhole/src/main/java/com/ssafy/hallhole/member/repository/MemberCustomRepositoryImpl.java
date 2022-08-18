package com.ssafy.hallhole.member.repository;

import com.ssafy.hallhole.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class MemberCustomRepositoryImpl implements MemberCustomRepository{

    private final EntityManager em;

    @Override
    public List<Member> findMembersByNamePaging(int start, int size, String name){
        return em.createQuery("select m from Member m order by m.followerCnt desc ",Member.class)
                .setFirstResult(start)
                .setMaxResults(size)
                .getResultList();
    }

    @Override
    public Long getMemberCntByName(String name) {
        return em.createQuery("select count(m) from Member m where m.name like :name ",Long.class)
                .setParameter("name","%"+name+"%")
                .getSingleResult();
    }


}
