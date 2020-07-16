package model;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.servlet.http.HttpServletRequest;
import java.security.Timestamp;
import java.util.List;

@Getter
@Setter
@ToString
public class Dorm {
   private Integer id;
   private String dormNo;
   private String dormDesc;
   private Integer buildingId;
   private Date createTime;
   private String buildingName;
   private List<Integer> ids;
}
