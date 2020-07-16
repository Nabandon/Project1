package DormServlet;

import DAO.DormDAO;
import model.Dorm;
import servlet.AbstractBaseServlet;
import util.JSONUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.InputStream;

@WebServlet("/dorm/queryById")
public class DormQueryByIdServlet extends AbstractBaseServlet {

    @Override
    public Object process(HttpServletRequest req, HttpServletResponse res) throws Exception {
        String id=req.getParameter("id");
       // Dorm dorm=JSONUtil.read(req.getInputStream(),Dorm.class);
        Dorm num= DormDAO.dormQueryById(Integer.parseInt(id));

        return num;
    }
}
