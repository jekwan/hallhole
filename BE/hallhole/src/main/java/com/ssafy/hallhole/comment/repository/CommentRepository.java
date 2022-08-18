package com.ssafy.hallhole.comment.repository;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.comment.domain.Comment;

import java.util.List;

public interface CommentRepository {


    void save(Comment comment);

    List<Comment> findAllComment();

    List<Comment> findAllCommentByReviewId(Long reviewId);

    List<Comment> findAllCommentByMemberId(Long memberId);

    Comment findOneCommentById(Long id) throws NotFoundException;

    List<Comment> findAllCommentPaging(int start, int size);

    List<Comment> findAllCommentPagingByMemberId(int start, int size, Long memberId);

    List<Comment> findAllCommentPagingByReviewId(int start, int size, Long reviewId);
}
