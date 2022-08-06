package com.ssafy.hallhole.performance.domain;

import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@ToString
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
public class Performance{

    @Id
    private String id;

    @NotNull
    private String facility_name;

    @NotNull
    @Column(length = 100)
    private String name;

    @NotNull
    private LocalDateTime startDate;

    @NotNull
    private LocalDateTime endDate;

    private String poster;

    @Column(length = 10)
    private String genre;
}
