package com.ssafy.hallhole.report.service;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.member.domain.Member;
import com.ssafy.hallhole.member.repository.MemberRepository;
import com.ssafy.hallhole.report.domain.Report;
import com.ssafy.hallhole.report.dto.ReportInputDTO;
import com.ssafy.hallhole.report.dto.ReportOutputDTO;
import com.ssafy.hallhole.report.repository.ReportRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ReportRepositoryImpl reportRepository;

    private final MemberRepository memberRepository;

    @Override
    public void addReport(ReportInputDTO inputDto) throws NotFoundException {
        Member reporter = memberRepository.findByIdTag(inputDto.getReporterTag());
        Member reported = memberRepository.findByIdTag(inputDto.getReportedTag());

        if (reporter==null || reporter.isOut() || reported==null || reported.isOut()){
            throw new NotFoundException("REPORTER나 REPORTED가 유효한 사용자가 아닙니다.");
        }

        Report report = new Report(reporter, reported, inputDto.getContents(), inputDto.getType());

        if(reportRepository.findSameReport(reporter.getIdTag(), reported.getIdTag(), LocalDateTime.now())!=0){
            throw new NotFoundException("동일한 사용자로부터 같은 아이디에게 한 신고가 이미 있습니다.");
            // 5분 이내에 함수가 안먹힘..
        }

        reportRepository.save(report);
    }

    @Override
    public List<ReportOutputDTO> showList() {
        List<Report> list = reportRepository.findAllList();
        List<ReportOutputDTO> outputList = new LinkedList<>();

        for(Report r:list){
            ReportOutputDTO output = new ReportOutputDTO(r.getId(), r.getMember().getId(), r.getRespondentMember().getId(),
                    r.getContents(), r.getType(), r.getStatus(),r.getDateTime());
            outputList.add(output);
        }

        return outputList;
    }


}
