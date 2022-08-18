package com.ssafy.hallhole.report.dto;

import com.ssafy.hallhole.report.domain.ReportStatus;
import com.ssafy.hallhole.report.domain.ReportType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReportInputDTO {

    // 신고자
    private String reporterTag;

    // 신고당한사람
    private String reportedTag;

    private String contents;

    private ReportType type;



}
