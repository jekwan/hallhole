package com.ssafy.hallhole.comment.repository;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.comment.domain.Comment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class CommentRepositoryImpl implements CommentRepository {

    private final EntityManager em;

    @Override
    public void save(Comment comment) {
        em.persist(comment);
    }

    @Override
    public List<Comment> findAllComment() {
        return em.createQuery("select c from Comment c where c.isDelete=false",Comment.class)
                .getResultList();
    }

    @Override
    public List<Comment> findAllCommentByReviewId(Long reviewId) {
        return em.createQuery("select c from Comment c where c.review.id=:reviewId and c.isDelete=false",Comment.class)
                .setParameter("reviewId",reviewId)
                .getResultList();
    }

    @Override
    public List<Comment> findAllCommentByMemberId(Long memberId) {
        return em.createQuery("select c from Comment c where c.member.id=:member_id and c.isDelete=false",Comment.class)
                .setParameter("member_id",memberId)
                .getResultList();
    }

    @Override
    public Comment findOneCommentById(Long id) throws NotFoundException {
        return Optional.ofNullable(em.find(Comment.class, id)).orElseThrow(() -> new NotFoundException("존재하지 않는 댓글입니다."));
    }

    @Override
    public List<Comment> findAllCommentPaging(int start, int size) {
        return em.createQuery("select c from Comment c where c.isDelete=false order by c.writingTime desc ",Comment.class)
                .setFirstResult(start)
                .setMaxResults(size)
                .getResultList();

    }

    @Override
    public List<Comment> findAllCommentPagingByMemberId(int start, int size, Long memberId) {
        return em.createQuery("select c from Comment c where c.member.id=:member_id and c.isDelete=false order by c.writingTime desc ",Comment.class)
                .setFirstResult(start)
                .setMaxResults(size)
                .setParameter("member_id",memberId)
                .getResultList();

    }

    @Override
    public List<Comment> findAllCommentPagingByReviewId(int start, int size, Long reviewId) {
        return em.createQuery("select c from Comment c where c.review.id=:review_id and c.isDelete=false order by c.writingTime desc ",Comment.class)
                .setFirstResult(start)
                .setMaxResults(size)
                .setParameter("review_id",reviewId)
                .getResultList();
    }

}
