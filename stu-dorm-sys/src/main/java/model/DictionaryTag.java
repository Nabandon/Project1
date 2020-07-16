package model;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 数据字典标签
 */
@Getter
@Setter
@ToString
public class DictionaryTag {
    
    private Integer id;

    /**
     * 键
     */
    private String dictionaryTagKey;

    /**
     * 值
     */
    private String dictionaryTagValue;

    /**
     * 描述
     */
    private String dictionaryTagDesc;

    /**
     * 数据字典id
     */
    private Integer dictionaryId;

    /**
     * 创建时间
     */
    private Date createTime;
}