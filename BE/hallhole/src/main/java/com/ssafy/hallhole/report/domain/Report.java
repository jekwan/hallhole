package com.ssafy.hallhole.report.domain;

import com.ssafy.hallhole.member.domain.Member;
import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@DynamicInsert
@DynamicUpdate
@Table(name = "reports")
@NoArgsConstructor
@AllArgsConstructor
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    private Member respondentMember;

    @NotNull
    private String contents;

    @NotNull
    @Builder.Default
    @Enumerated(EnumType.STRING)
    private ReportType type = ReportType.ETC;

    @Setter
    @NotNull
    @Builder.Default
    @Column(length = 20)
    @Enumerated(EnumType.STRING)
    private ReportStatus status = ReportStatus.REPORTED;

    @CreationTimestamp
    private LocalDateTime dateTime;

    public Report(Member member, Member respondentMember, String contents, ReportType type) {
        this.member = member;
        this.respondentMember = respondentMember;
        this.contents = contents;
        this.type = type;
        this.status = ReportStatus.REPORTED;
    }
}
