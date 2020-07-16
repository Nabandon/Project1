package servlet;

import DAO.StudentDao;
import model.Student;
import util.JSONUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/student/update")
public class StudentUpdateServlet extends AbstractBaseServlet {
    @Override
    public Object process(HttpServletRequest req, HttpServletResponse res) throws Exception {
        Student student= JSONUtil.read(req.getInputStream(),Student.class);
        int num= StudentDao.update(student);
        return null;
    }
}
