package com.ssafy.hallhole.performance.controller;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.performance.domain.Performance;
import com.ssafy.hallhole.performance.dto.PerformanceLikeInputDTO;
import com.ssafy.hallhole.performance.dto.PerformanceLikePagingInputDTO;
import com.ssafy.hallhole.performance.service.PerformanceLikeServiceImpl;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/plike")
public class PerformanceLikeController {

    private final PerformanceLikeServiceImpl pLikeService;

    @PostMapping("/add")
    @ApiOperation(value = "좋아요 생성", notes = "'/plike/add'")
    public void makeLike(@RequestBody PerformanceLikeInputDTO inputDto) throws NotFoundException {
        pLikeService.makeLike(inputDto.getPerformanceId(), inputDto.getMemberTag());
    }

    @DeleteMapping("/sub")
    @ApiOperation(value = "좋아요 취소", notes = "'/plike/sub'")
    public void cancelLike(@RequestBody PerformanceLikeInputDTO inputDto) throws NotFoundException {
        pLikeService.cancelLike(inputDto.getPerformanceId(), inputDto.getMemberTag());
    }

    @GetMapping("/{pid}")
    @ApiOperation(value = "공연별 좋아요 수", notes = "'/plike/PF194668' 형식으로 사용, pid = 공연ID")
    public Long findPerformanceLikeCnt(@PathVariable("pid") String pid) throws NotFoundException {
        return pLikeService.findByPerformanceCnt(pid);
    }

    @PostMapping("/list")
    @ApiOperation(value = "유저 별 좋아요 페이징",notes = "")
    public List<Performance> findPerformanceLikeByMember(@RequestBody PerformanceLikePagingInputDTO inputDto) throws NotFoundException {
        return pLikeService.findPerformanceLikePagingByMemberId(inputDto);
    }

    @GetMapping("/popular/{size}")
    @ApiOperation(value = "좋아요가 높은 공연", notes = "'/plike/popular/3' 형식으로 사용, size = 뽑을 공연의 수")
    public List<Performance> findPopularPerformance(@PathVariable("size") int size) throws NotFoundException {
        return pLikeService.findPopularPerformance(size);
    }

    @GetMapping("/{pid}/{tag}")
    @ApiOperation(value = "해당 멤버가 해당 공연 좋아요를 하고있는지 확인",
            notes = "'/plike/PF194668/JVWUZ9HZ9W' 형식으로 사용. pid = 공연ID, tag = 멤버태그")
    public boolean isLike(@PathVariable("pid") String pid, @PathVariable("tag") String tag) throws NotFoundException {
        return pLikeService.isLike(pid, tag);
    }
    @GetMapping("/cnt/{tag}")
    @ApiOperation(value = "해당 멤버가 좋아요 한 공연이 몇 개인지 확인",
            notes = "'/plike/cnt/JVWUZ9HZ9W' 형식으로 사용. tag = 멤버태그")
    public Long likeCnt(@PathVariable("tag") String tag) throws NotFoundException {
        return pLikeService.likeCnt(tag);
    }


}
