package com.ssafy.hallhole.report.dto;

import com.ssafy.hallhole.report.domain.ReportStatus;
import com.ssafy.hallhole.report.domain.ReportType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReportOutputDTO {

    private Long reportId;

    private Long reporterId;

    private Long reportedId;

    private String contents;

    private ReportType type;

    private ReportStatus status;

    private LocalDateTime dateTime;

}
