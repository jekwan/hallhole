package com.ssafy.hallhole.follow.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PagingInputDTO {

    private int start;

    private int size;

    private String idTag;

}
