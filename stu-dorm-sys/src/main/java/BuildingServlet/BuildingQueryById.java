package BuildingServlet;

import DAO.BuildingDAO;
import model.Building;
import servlet.AbstractBaseServlet;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/building/queryById")
public class BuildingQueryById extends AbstractBaseServlet {
    @Override
    public Object process(HttpServletRequest req, HttpServletResponse res) throws Exception {
        String id=req.getParameter("id");
        Building building= BuildingDAO.queryById(Integer.parseInt(id));
        return building;
    }
}
