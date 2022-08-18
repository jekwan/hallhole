package com.ssafy.hallhole.item.service;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.item.domain.Item;
import com.ssafy.hallhole.item.domain.ItemType;
import com.ssafy.hallhole.item.domain.OwnItem;
import com.ssafy.hallhole.item.dto.ItemChangeInputDTO;
import com.ssafy.hallhole.item.dto.ItemInputDTO;
import com.ssafy.hallhole.item.repository.ItemRepository;
import com.ssafy.hallhole.member.domain.Member;
import com.ssafy.hallhole.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService{

    private final ItemRepository itemRepository;

    private final MemberRepository memberRepository;

    @Override
    public List<Item> getAllItemByType(String type) {

        return itemRepository.findAllByType(type);
    }

    @Override
    public List<OwnItem> getAllMyItem(String tag) throws NotFoundException {

        Member m = memberRepository.findByIdTag(tag);
        if(m==null || m.isOut()){
            throw new NotFoundException(" 유효한 사용자가 아닙니다.");
        }

        return itemRepository.findAllMyItem(m.getId());
    }

    @Override
    public void addItem(ItemInputDTO inputDTO) throws NotFoundException {

        if(itemRepository.findByTypeInfo(inputDTO.getItemType(), inputDTO.getTypeId())==0){
            Item item;
            if(inputDTO.getItemType().equals("ACC")){
                item = new Item(ItemType.ACC, inputDTO.getTypeId());
            } else {
                item = new Item(ItemType.CHAR, inputDTO.getTypeId());
            }

            itemRepository.save(item);
        }

        else{
            throw new NotFoundException("해당 타입별 해당 타입아이디가 이미 있습니다.");
        }

    }
    @Override
    public void myItemChange(ItemChangeInputDTO inputDTO) throws NotFoundException {

        Member m = memberRepository.findByIdTag(inputDTO.getIdTag());
        if(m==null || m.isOut()){
            throw new NotFoundException("유효한 사용자가 아닙니다.");
        }

        if(itemRepository.findByTypeInfo("ACC", inputDTO.getAcc_id())==0){
            throw new NotFoundException("해당 악세사리는 존재하지 않습니다.");
        }
        if(itemRepository.findByTypeInfo("CHAR", inputDTO.getChar_id())==0){
            throw new NotFoundException("해당 색상이 존재하지 않습니다.");
        }

        m.setNowChar(inputDTO.getChar_id().intValue());
        m.setNowAcc(inputDTO.getAcc_id().intValue());

        memberRepository.save(m);
    }
}
