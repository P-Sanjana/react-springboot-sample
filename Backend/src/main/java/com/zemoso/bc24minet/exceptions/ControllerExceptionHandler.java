package com.zemoso.bc24minet.exceptions;

import com.zemoso.bc24minet.exceptions.DataNotFoundException;
import com.zemoso.bc24minet.dto.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.ValidationException;

@Slf4j
@ControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(ValidationException e) {
        log.error("Validation Error", e);
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setStatusCode(HttpStatus.BAD_REQUEST.value());
        errorResponse.setMessage(e.getMessage());
        errorResponse.setTimestamp(System.currentTimeMillis());
        return ResponseEntity.badRequest().body(errorResponse);
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ErrorResponse> handleException(ResponseStatusException e) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setStatusCode(e.getRawStatusCode());
        errorResponse.setMessage(e.getMessage());
        errorResponse.setTimestamp(System.currentTimeMillis());
        return ResponseEntity.status(e.getStatus()).body(errorResponse);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleException(DataNotFoundException exception) {
        log.error("DataNotFoundException error", exception);
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setStatusCode(HttpStatus.NOT_FOUND.value());
        errorResponse.setMessage(exception.getMessage());
        errorResponse.setTimestamp(System.currentTimeMillis());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleGenericException(Exception exception) {
        log.error("Unknown error", exception);
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
        errorResponse.setMessage(exception.getMessage());
        errorResponse.setTimestamp(System.currentTimeMillis());
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
