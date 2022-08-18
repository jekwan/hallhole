package com.ssafy.hallhole.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class CommentOutputDTO {

    private Long commentId;

    private String idTag;

    private int memberBg;

    private int memberChar;

    private int memberAcc;

    private Long reviewId;

    private String contents;

    private LocalDateTime writingTime;

    private LocalDateTime updateTime;

    public CommentOutputDTO(Long commentId, String idTag, int memberBg, int memberChar, int memberAcc, Long reviewId, String contents, LocalDateTime writingTime, LocalDateTime updateTime) {
        this.commentId = commentId;
        this.idTag = idTag;
        this.memberBg = memberBg;
        this.memberChar = memberChar;
        this.memberAcc = memberAcc;
        this.reviewId = reviewId;
        this.contents = contents;
        this.writingTime = writingTime;
        this.updateTime = updateTime;
    }
}
