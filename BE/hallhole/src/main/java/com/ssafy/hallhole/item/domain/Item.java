package com.ssafy.hallhole.item.domain;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@Builder
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(length = 5)
    @Enumerated(EnumType.STRING)
    private ItemType itemType;

    @NotNull
    private Long type_id;

    @Builder.Default
    @ColumnDefault("0")
    private int price = 0;

    public Item(ItemType itemType, Long type_id) {
        this.itemType = itemType;
        this.type_id = type_id;
    }
}
