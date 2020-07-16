package servlet;

import DAO.StudentDao;
import model.Student;
import util.JSONUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/student/apply")
public class StudentApplyServlet extends AbstractBaseServlet {
    @Override
    public Object process(HttpServletRequest req, HttpServletResponse res) throws Exception {
        Student s= JSONUtil.read(req.getInputStream(),Student.class);
        int num= StudentDao.apply(s);
        return null;
    }
}
