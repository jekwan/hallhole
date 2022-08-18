package com.ssafy.hallhole.item.controller;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.item.domain.Item;
import com.ssafy.hallhole.item.domain.OwnItem;
import com.ssafy.hallhole.item.dto.ItemChangeInputDTO;
import com.ssafy.hallhole.item.dto.ItemInputDTO;
import com.ssafy.hallhole.item.service.ItemServiceImpl;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/item")
@RequiredArgsConstructor
@ApiOperation(value = "itemController")
public class ItemController {

    private final ItemServiceImpl itemService;
    @GetMapping("/all-list/{type}")
    @ApiOperation(value = "아이템 전체 목록 보기",
            notes = "'/item/all-list/ACC' 형식으로 사용. type >> ACC(악세사리), BG(배경), CHAR(캐릭터)")
    public List<Item> showAllListByType(@PathVariable("type") String type) throws NotFoundException {
        return itemService.getAllItemByType(type);
    }
    @PostMapping("/add")
    @ApiOperation(value = "아이템 상점 등록", notes = "'/item/add'")
    public ResponseEntity addItemInShop(@RequestBody ItemInputDTO inputDto) throws NotFoundException {
        itemService.addItem(inputDto);
        return new ResponseEntity(HttpStatus.OK);
    }
    @PostMapping("/change")
    @ApiOperation(value = "내 현재 아이템 변경", notes = "'/item/change'")
    public ResponseEntity changeMyItem(@RequestBody ItemChangeInputDTO inputDto) throws NotFoundException {
        itemService.myItemChange(inputDto);
        return new ResponseEntity(HttpStatus.OK);
    }
}
