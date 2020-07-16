package DormServlet;

import DAO.DormDAO;
import model.Dorm;
import servlet.AbstractBaseServlet;
import util.JSONUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/dorm/update")
public class DormUpdateServlet extends AbstractBaseServlet {
    @Override
    public Object process(HttpServletRequest req, HttpServletResponse res) throws Exception {
        Dorm dorm= JSONUtil.read(req.getInputStream(),Dorm.class);
        int num= DormDAO.dormUpdate(dorm);
        return null;
    }
}
