package com.ssafy.hallhole.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommentFindByMemberTagDTO {

    private String idTag;

    private int start;

    private int size;

}
