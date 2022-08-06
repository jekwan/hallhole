package com.ssafy.hallhole.comment.domain;

import com.ssafy.hallhole.member.domain.Member;
import com.ssafy.hallhole.review.domain.Review;
import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.*;

import javax.persistence.Entity;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @JoinColumn(name = "member_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @NotNull
    @JoinColumn(name = "review_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Review review;

    @NotNull
    @Setter
    @Column(columnDefinition = "MEDIUMTEXT")
    private String contents;

    @NotNull
    @Setter
    @Builder.Default
    @ColumnDefault("false")
    private boolean isDelete = false;

    @CreationTimestamp
    private LocalDateTime writingTime;

    @UpdateTimestamp
    private LocalDateTime updateTime;

}
