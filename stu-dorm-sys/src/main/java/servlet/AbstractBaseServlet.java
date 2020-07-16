package servlet;

import com.fasterxml.jackson.databind.ObjectMapper;
import model.Response;
import util.JSONUtil;
import util.ThreadLocalHolder;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;

public abstract class AbstractBaseServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
        doPost(req,res);
    }
    @Override
    protected void doPost(HttpServletRequest req,HttpServletResponse res) throws IOException {
        req.setCharacterEncoding("UTF-8");//请求体编码
        res.setCharacterEncoding("UTF-8");//响应体设置编码格式
        res.setContentType("application/json");//浏览器接收数据解析方式

        Response response=new Response();//包装统一返回数据类型
        try {
            Object o= process(req,res);
            response.setSuccess(true);
            response.setCode("200");
            response.setMessage("操作成功");
            response.setTotal(ThreadLocalHolder.get().get());//获取当前线程设置的count变量;
            response.setData(o);
        } catch (Exception e) {
           response.setCode("500");
           response.setMessage(e.getMessage());

           //堆栈日志
            StringWriter sw=new StringWriter();
            PrintWriter pw=new PrintWriter(sw);
            e.printStackTrace(pw);
            String stackTrace =sw.toString();
            System.err.printf(stackTrace);
            response.setStackTrace(stackTrace);
        }finally {
            ThreadLocalHolder.get().remove();//使用完ThreadLocal 在线程结束前remove变量,否则容易出现内存泄漏
        }
        //响应数据,json数据
        PrintWriter printWriter=res.getWriter();
        printWriter.println(JSONUtil.write(response));//序列化
        printWriter.flush();
    }

    //让子类实现具体方法
    public abstract Object process (HttpServletRequest req,HttpServletResponse res) throws Exception;
}
