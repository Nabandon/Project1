package filter;

import model.Response;
import util.JSONUtil;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

//过滤器:http请求的url匹配过滤器的路径,才会过滤
@WebFilter("/*")
public class LoginFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
//初始化
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req =(HttpServletRequest)request;
        HttpServletResponse res=(HttpServletResponse)response;
        //页面的静态资源,后台服务
        //敏感资源:1.访问首页需要登录,若未登录重定向登录页面;
        //2.后端服务:除/user/login 之外的接口,未登录时返回未登录的json信息

        HttpSession session=req.getSession(false);//没有session,返回null
        if(session==null){//未登录
            //获取当前 Http请求路径
            String url=req.getServletPath();
            if("/public/page/main.html".equals(url)){//访问首页时
                String sch=req.getScheme();//http
                String host=req.getServerName();//域名或ip
                int port=req.getServerPort();//端口号
                String cont=req.getContextPath();//项目部署路径
                String base=sch+"://"+host+":"+port+cont;
                res.sendRedirect(base+"/public/index.html");
                return;
            }else if(!"/user/login".equals(url) && !url.startsWith("/public/") && !url.startsWith("/static/")) {
                req.setCharacterEncoding("UTF-8");//请求体编码
                res.setCharacterEncoding("UTF-8");//响应体设置编码格式
                res.setContentType("application/json");//浏览器接收数据解析方式

                Response r=new Response();//包装统一返回数据类型
                r.setCode("301");//不是状态码,是响应体字段;
                r.setMessage("未授权的http请求");
                PrintWriter pw=res.getWriter();
                pw.println(JSONUtil.write(r));
                pw.flush();
                return;
            }
        }
       chain.doFilter(request,response);//过滤器向下调用再次过滤,
    }

    @Override
    public void destroy() {
//销毁
    }
}
