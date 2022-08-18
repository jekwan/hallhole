package com.ssafy.hallhole.review.service;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.review.domain.ReactionType;
import com.ssafy.hallhole.review.repository.ReactionTypeRepositoryImpl;
import com.ssafy.hallhole.review.repository.ReviewReactionRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ReactionTypeServiceImpl implements ReactionTypeService{

    private final ReviewReactionRepositoryImpl rrRepository;
    private final ReactionTypeRepositoryImpl rtRepository;

    @Override
    public List<ReactionType> showRType() {
        return rtRepository.showReactionList();
    }

    @Override
    public void makeReactionType(String reaction) throws NotFoundException {

        if(rrRepository.findSameReactionName(reaction)>0){
            throw new NotFoundException("이미 있는 리액션입니다.");
        }

        ReactionType rType = new ReactionType(reaction);
        rrRepository.save(rType);
        // 중복 지우기
    }
}
