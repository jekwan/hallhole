package com.ssafy.hallhole.report.controller;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.report.dto.ReportInputDTO;
import com.ssafy.hallhole.report.dto.ReportOutputDTO;
import com.ssafy.hallhole.report.service.ReportServiceImpl;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/report")
@RequiredArgsConstructor
@ApiOperation(value = "reportController")
public class ReportController {

    private final ReportServiceImpl reportService;

    @PostMapping
    @ApiOperation(value = "신고 등록", notes = "'/report' 5분 안에 같은 report, reported 인 신고가 있다면 받지 않음")
    public ResponseEntity reportMember(@RequestBody ReportInputDTO inputDto) throws NotFoundException {
        reportService.addReport(inputDto);
        return new ResponseEntity(HttpStatus.OK);
    }

    // 신고목록보기
    @GetMapping("/list")
    @ApiOperation(value = "신고 목록 보기", notes = "'/report/list' 나중에 admin 페이지 만들게 된다면 admin으로 이동 예정")
    public List<ReportOutputDTO> showList() throws NotFoundException {
        return reportService.showList();
    }

}
