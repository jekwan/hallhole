package com.ssafy.hallhole.chat.domain;

import com.ssafy.hallhole.config.StringListConverter;
import com.ssafy.hallhole.performance.domain.Performance;
import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Builder
@ToString
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
public class Chatroom implements Serializable {

    @Id
    @JoinColumn(name = "performance_id")
    @OneToOne(fetch = FetchType.LAZY)
    private Performance performance;

    @NotNull
    @Column(length = 50)
    private String name;

    @NotNull
    private LocalDateTime openTime;

    @NotNull
    private LocalDateTime closeTime;

    @Convert(converter = StringListConverter.class)
    private List<String> memberNameList = new ArrayList<>();

    public void addUser(String name) {
        if (!memberNameList.contains(name)) {
            memberNameList.add(name);
        }
    }

    public void subUser(String name) {
        if (memberNameList.contains(name)) {
            memberNameList.remove(name);
        }
    }

    public int getMemberCnt(){
        return this.memberNameList.size();
    }
}
