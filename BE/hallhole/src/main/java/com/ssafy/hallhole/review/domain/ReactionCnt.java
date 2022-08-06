package com.ssafy.hallhole.review.domain;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Builder
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
public class ReactionCnt implements Serializable {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "review_id")
    private Review review;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reaction_type_id")
    private ReactionType reactiontype;

    @NotNull
    @Builder.Default
    @ColumnDefault("1")
    private int reactionCnt = 1;

    public void addReaction() {
        this.reactionCnt++;
        return;
    }

    public void subReaction() {
        this.reactionCnt--;
        return;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ReactionCnt that = (ReactionCnt) o;

        if (reactionCnt != that.reactionCnt) return false;
        if (review != null ? !review.equals(that.review) : that.review != null) return false;
        return reactiontype != null ? reactiontype.equals(that.reactiontype) : that.reactiontype == null;
    }

    @Override
    public int hashCode() {
        int result = review != null ? review.hashCode() : 0;
        result = 31 * result + (reactiontype != null ? reactiontype.hashCode() : 0);
        result = 31 * result + reactionCnt;
        return result;
    }
}
