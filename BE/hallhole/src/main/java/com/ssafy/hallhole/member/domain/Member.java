package com.ssafy.hallhole.member.domain;

import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Builder
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ColumnDefault("HH")
    @Builder.Default
    private String provider="HH";

    private String kakaoSid;
    @Setter
    @NotNull
    @Column(length = 20)
    private String name;

    private String email;

    @Setter
    private String password;

    @Setter
    @Column(length = 2)
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Setter
    private LocalDate birth;

    @NotNull
    @Builder.Default
    @ColumnDefault("false")
    private boolean isAdmin = false;

    @Setter
    @NotNull
    @Builder.Default
    @Column(columnDefinition = "INT UNSIGNED")
    @ColumnDefault("0")
    private int point = 0;

    @Setter
    @NotNull
    @CreationTimestamp
    private LocalDate joinDate;

    @Setter
    @NotNull
    @Builder.Default
    @ColumnDefault("false")
    private boolean isOut = false;

    @Setter
    private LocalDate outDate;

    @Setter
    @NotNull
    @Column(unique = true, length = 10)
    private String idTag;

    @Setter
    @NotNull
    @Builder.Default
    @ColumnDefault("false")
    private boolean isBan = false;

    @NotNull
    @Builder.Default
    @ColumnDefault("0")
    private int followingCnt = 0;

    @NotNull
    @Builder.Default
    @ColumnDefault("0")
    private int followerCnt = 0;

    @Setter
    @Column(length = 52)
    private String profile;

    @Setter
    @NotNull
    @Builder.Default
    @ColumnDefault("0")
    @Column(columnDefinition = "INT UNSIGNED")
    private int nowBg = 0;

    @Setter
    @NotNull
    @Builder.Default
    @ColumnDefault("0")
    @Column(columnDefinition = "INT UNSIGNED")
    private int nowChar = 0;

    @Setter
    @NotNull
    @Builder.Default
    @ColumnDefault("0")
    @Column(columnDefinition = "INT UNSIGNED")
    private int nowAcc = 0;

    @Setter
    @Enumerated(EnumType.STRING)
    private Authority authority;

    public Member(String email, String name, String password) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.provider = "HH";
    }

    public Member(String provider, String kakaoSid, String name, String email) {
        this.provider = provider;
        this.kakaoSid=kakaoSid;
        this.email = email;
        this.name = name;
    }

    public void addFollowingCnt() {
        this.followingCnt++;
    }

    public void subFollowingCnt() {
        this.followingCnt--;
    }

    public void addFollowerCnt() {
        this.followerCnt++;
    }

    public void subFollowerCnt() {
        this.followerCnt--;
    }

    public void addPoint(int delta) {
        this.point += delta;
    }

    public void addIdTag(String tag) {
        this.idTag="";
        this.idTag+=tag;
    }

    public void subPoint(int delta) {
        int remainPoint = this.point - delta;
        if (remainPoint < 0) {
            throw new IllegalStateException("포인트가 부족합니다.");
        }
        this.point = remainPoint;
    }

}
