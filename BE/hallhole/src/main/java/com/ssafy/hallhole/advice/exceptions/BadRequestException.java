package com.ssafy.hallhole.advice.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;


public class BadRequestException extends Exception{
    @Getter
    HttpStatus status = HttpStatus.BAD_REQUEST;

    public BadRequestException(String msg) {
        super(msg);
    }
}