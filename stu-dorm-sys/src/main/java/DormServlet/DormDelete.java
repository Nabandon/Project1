package DormServlet;

import DAO.DormDAO;
import model.Dorm;
import servlet.AbstractBaseServlet;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/dorm/delete")
public class DormDelete extends AbstractBaseServlet {

    @Override
    public Object process(HttpServletRequest req, HttpServletResponse res) throws Exception {
        String[] ids=req.getParameterValues("ids");
        int num= DormDAO.delet(ids);
        return null;
    }
}
