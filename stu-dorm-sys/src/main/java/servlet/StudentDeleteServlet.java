package servlet;

import DAO.StudentDao;
import model.Student;
import util.JSONUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.StringWriter;

@WebServlet("/student/delete")
public class StudentDeleteServlet extends AbstractBaseServlet {
    @Override
    public Object process(HttpServletRequest req, HttpServletResponse res) throws Exception {
      //相同的key有多个,可以获取到value数组
        String[] ids=req.getParameterValues("ids");
        int num=StudentDao.delete(ids);
        return null;
    }
}
