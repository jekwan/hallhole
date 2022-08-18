package com.ssafy.hallhole.comment.service;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.comment.domain.Comment;
import com.ssafy.hallhole.comment.dto.*;

import java.util.List;

public interface CommentService {

    void writeComment(CommentWriteInputDTO inputDTO) throws NotFoundException;

    void deleteComment(CommentDeleteInputDTO inputDTO) throws NotFoundException;

    void updateComment(CommentUpdateInputDTO inputDTO) throws NotFoundException;

    List<CommentOutputDTO> CommentListfindByMemberId(CommentFindByMemberTagDTO inputDTO) throws NotFoundException;

    List<CommentOutputDTO> CommentListfindByReviewId(CommentFindByReviewIdDTO inputDTO) throws NotFoundException;
}
