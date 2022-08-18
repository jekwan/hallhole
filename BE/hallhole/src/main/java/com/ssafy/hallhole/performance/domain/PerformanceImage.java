package com.ssafy.hallhole.performance.domain;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Builder
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
public class PerformanceImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "performance_id")
    private Performance performance;

    @Getter
    private String url;

    @Getter
    @Column(columnDefinition = "INT UNSIGNED")
    private int sortingNum;

    @Override
    public String toString() {
        return "PerformanceImage{" + "id=" + id + ", url='" + url + '\'' + ", sortingNum=" + sortingNum + '}';
    }
}
