package com.ssafy.hallhole.twitter.repository;

import com.ssafy.hallhole.twitter.Twitter;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface TwitterRepository extends JpaRepository<Twitter,String> {
    Twitter save(Twitter twitter);

    Twitter findTwitterById(String id);

    List<Twitter> findAllByOrderByTimeDesc();

    List<Twitter> findAllByOrderByTimeDesc(Pageable pageable);
}
