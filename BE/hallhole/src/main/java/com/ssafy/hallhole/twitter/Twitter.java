package com.ssafy.hallhole.twitter;

import com.sun.istack.NotNull;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
public class Twitter {

    @Id
    @Column(length = 25)
    @ApiModelProperty(example = "트윗 ID")
    private String id;

    @NotNull
    @ApiModelProperty(example = "트윗 내용")
    private String contents;

    @ApiModelProperty(example = "예매 링크")
    private String url;

    @NotNull
    @ApiModelProperty(example = "트윗 작성 시간")
    private LocalDateTime time;

}

