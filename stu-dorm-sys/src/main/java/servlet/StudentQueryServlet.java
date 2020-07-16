package servlet;

import DAO.StudentDao;
import model.Page;
import model.Student;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@WebServlet("/student/query")
public class StudentQueryServlet extends AbstractBaseServlet {
//解析searchText=&sortOrder=asc&pageSize=7&pageNumber=1

    @Override
    public Object process(HttpServletRequest req, HttpServletResponse res) throws Exception {
        Page page =Page.parse(req);
        List<Student> students= StudentDao.query(page);
        return students;
    }
}
