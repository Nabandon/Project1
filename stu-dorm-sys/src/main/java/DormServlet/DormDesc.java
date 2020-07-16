package DormServlet;

import DAO.DormDAO;
import model.Dorm;
import servlet.AbstractBaseServlet;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@WebServlet("/dorm/query")
public class DormDesc extends AbstractBaseServlet {
    @Override
    public Object process(HttpServletRequest req, HttpServletResponse res) throws Exception {
        List<Dorm> dorms= DormDAO.desc();
        return dorms;
    }
}
