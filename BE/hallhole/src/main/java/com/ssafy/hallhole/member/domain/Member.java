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
public class Member implements UserDetails {

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

    @Setter
    private String email;

    @Setter
    @Column(length = 25)
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

    @NotNull
    @Builder.Default
    @Column(columnDefinition = "INT UNSIGNED")
    @ColumnDefault("0")
    private int point = 0;

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

    public Member(String email, String name, String password) {
        this.email = email;
        this.name = name;
        this.password = password;
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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        System.out.println("");
        if (!this.provider.equals("HH")) return this.kakaoSid;
        else return this.email;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // 계정의 잠김 여부 리턴
        if(this.isBan) return false;
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // 비밀번호 만료 여부 리턴
        return true;
    }

    @Override
    public boolean isEnabled() {
        // 계정의 활성화 여부 리턴
        if(this.isOut) return false;
        return true;
    }
}
