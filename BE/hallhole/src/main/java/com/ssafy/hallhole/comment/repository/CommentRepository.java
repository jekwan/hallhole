package com.ssafy.hallhole.comment.repository;

import com.ssafy.hallhole.comment.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment,Long> {




}
