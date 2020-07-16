package model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Getter
@Setter
@ToString
public class Page {
    private String searchText;//搜索内容
    private String sortOrder;//排序方法
    private Integer pageSize;//每页数量
    private Integer pageNumber;//当前页码

    public  static  Page parse(HttpServletRequest req){
        Page page=new Page();
        page.searchText=req.getParameter("searchText");
        page.sortOrder =req.getParameter("sortOrder");
        page.pageSize=Integer.parseInt(req.getParameter("pageSize"));
        page.pageNumber=Integer.parseInt(req.getParameter("pageNumber"));
        return page;
    }
}
