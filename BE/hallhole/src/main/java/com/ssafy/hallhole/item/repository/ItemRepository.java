package com.ssafy.hallhole.item.repository;

import com.ssafy.hallhole.item.domain.Item;
import com.ssafy.hallhole.item.domain.ItemType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item,Long> {

    @Query(value = "select * from Item where itemType=:type", nativeQuery = true)
    List<Item> findAllByType(@Param("type")ItemType type);
}
