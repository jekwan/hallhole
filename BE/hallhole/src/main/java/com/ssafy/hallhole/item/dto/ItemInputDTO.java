package com.ssafy.hallhole.item.dto;

import com.ssafy.hallhole.item.domain.ItemType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ItemInputDTO {

    private String itemType;

    private Long typeId;

}
