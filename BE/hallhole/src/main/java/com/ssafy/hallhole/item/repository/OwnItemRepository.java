package com.ssafy.hallhole.item.repository;

import com.ssafy.hallhole.item.domain.Item;
import com.ssafy.hallhole.item.domain.OwnItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OwnItemRepository extends JpaRepository<OwnItem,Long> {

    @Query(value = "select * from OwnItem where item_id=:item_id", nativeQuery = true)
    List<Item> findAllByItemId(@Param("item_id") int item_id);

}
