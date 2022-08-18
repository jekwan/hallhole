package com.ssafy.hallhole.item.service;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.item.domain.Item;
import com.ssafy.hallhole.item.domain.ItemType;
import com.ssafy.hallhole.item.domain.OwnItem;
import com.ssafy.hallhole.item.dto.ItemChangeInputDTO;
import com.ssafy.hallhole.item.dto.ItemInputDTO;

import java.util.List;

public interface ItemService {

    List<Item> getAllItemByType(String type);

    List<OwnItem> getAllMyItem(String tag) throws NotFoundException;

    void addItem(ItemInputDTO inputDTO) throws NotFoundException;

    void myItemChange(ItemChangeInputDTO inputDTO) throws NotFoundException;

}
