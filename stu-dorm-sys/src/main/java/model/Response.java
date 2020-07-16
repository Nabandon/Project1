package model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Response {
    private boolean success;
    private String code;
    private String message;
    private Integer total;
    private Object data;
    private String stackTrace;//异常堆栈信息
}
