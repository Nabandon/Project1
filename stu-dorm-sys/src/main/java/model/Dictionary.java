package model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class Dictionary {
    private Integer id;
    private String dictionaryKey;
    private String dictionaryValue;
    private String dictionaryDesc;
    private Date createTime;
}
