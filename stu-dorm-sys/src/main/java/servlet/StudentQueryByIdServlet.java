package servlet;

import DAO.StudentDao;
import model.Student;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@WebServlet("/student/queryById")
public class StudentQueryByIdServlet extends AbstractBaseServlet {

    @Override
    public Object process(HttpServletRequest req, HttpServletResponse res) throws Exception {
        String string=req.getParameter("id");
        Student s= StudentDao.queryById(Integer.parseInt(string));

        return s ;
    }
}
