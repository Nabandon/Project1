package model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString
//表转换实体类,表转换成对象
public class Building {
    private Integer id;
    private String buildingName;
    private String buildingDesc;
    private Date createTime;
    private Integer dormCount;
}
