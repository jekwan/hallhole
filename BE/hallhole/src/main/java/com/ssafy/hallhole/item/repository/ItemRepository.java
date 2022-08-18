package com.ssafy.hallhole.item.repository;

import com.ssafy.hallhole.item.domain.Item;
import com.ssafy.hallhole.item.domain.ItemType;
import com.ssafy.hallhole.item.domain.OwnItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item,Long> {

    @Query(value = "select * from item where item_type=:type", nativeQuery = true)
    List<Item> findAllByType(@Param("type")String type);

    @Query(value = "select * from own_item where member_id=:mId", nativeQuery = true)
    List<OwnItem> findAllMyItem(@Param("mId")Long mId);

    @Query(value = "select count(*) from item where item_type=:type and type_id=:typeId",nativeQuery = true)
    Long findByTypeInfo(@Param("type")String type, @Param("typeId")Long typeId);

}
