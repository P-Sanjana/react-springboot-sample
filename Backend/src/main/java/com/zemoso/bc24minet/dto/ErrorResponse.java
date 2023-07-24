package com.zemoso.bc24minet.dto;

public class ErrorResponse {


    public int getStatusCode() {
        return statusCode;
    }

    public ErrorResponse() {
    }

    public ErrorResponse(int statusCode, String message, long timestamp) {
        this.statusCode = statusCode;
        this.message = message;
        this.timestamp = timestamp;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    private int statusCode;

    private String message;

    private long timestamp;
}

