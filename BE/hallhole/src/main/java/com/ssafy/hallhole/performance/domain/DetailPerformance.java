package com.ssafy.hallhole.performance.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;

@Entity
@Getter
@Builder
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
public class DetailPerformance implements Serializable {

    @Id
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "performance_id")
    private Performance performance;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "facility_id")
    private Facility facility;

    private String actor;

    private String runtime;

    private String productionCompany;

    private String price;

    @Builder.Default
    @OneToMany(mappedBy = "performance",cascade = CascadeType.ALL)
    private List<PerformanceImage> images = new LinkedList<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DetailPerformance that = (DetailPerformance) o;

        if (performance != null ? !performance.equals(that.performance) : that.performance != null) return false;
        if (actor != null ? !actor.equals(that.actor) : that.actor != null) return false;
        if (runtime != null ? !runtime.equals(that.runtime) : that.runtime != null) return false;
        if (productionCompany != null ? !productionCompany.equals(that.productionCompany) : that.productionCompany != null)
            return false;
        if (price != null ? !price.equals(that.price) : that.price != null) return false;
        return images != null ? images.equals(that.images) : that.images == null;
    }

    @Override
    public int hashCode() {
        int result = performance != null ? performance.hashCode() : 0;
        result = 31 * result + (actor != null ? actor.hashCode() : 0);
        result = 31 * result + (runtime != null ? runtime.hashCode() : 0);
        result = 31 * result + (productionCompany != null ? productionCompany.hashCode() : 0);
        result = 31 * result + (price != null ? price.hashCode() : 0);
        result = 31 * result + (images != null ? images.hashCode() : 0);
        return result;
    }
}
