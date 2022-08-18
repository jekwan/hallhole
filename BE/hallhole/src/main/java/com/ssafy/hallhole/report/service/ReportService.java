package com.ssafy.hallhole.report.service;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.report.dto.ReportInputDTO;
import com.ssafy.hallhole.report.dto.ReportOutputDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ReportService {

    void addReport(ReportInputDTO inputDto) throws NotFoundException;

    List<ReportOutputDTO> showList();

}
