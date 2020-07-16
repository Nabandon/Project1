package DormServlet;

import DAO.DormDAO;
import DAO.StudentDao;
import model.Dorm;
import model.Student;
import servlet.AbstractBaseServlet;
import util.JSONUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/dorm/add")
public class DormAdd extends AbstractBaseServlet {
    @Override
    public Object process(HttpServletRequest req, HttpServletResponse res) throws Exception {
       Dorm dorm= JSONUtil.read(req.getInputStream(),Dorm.class);
        int num= DormDAO.add(dorm);
        return null;
    }
}
