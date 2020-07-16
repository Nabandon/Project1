package BuildingServlet;

import DAO.BuildingDAO;
import DAO.DormDAO;
import model.Building;
import model.Dorm;
import model.Page;
import servlet.AbstractBaseServlet;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@WebServlet("/building/query")
public class BuildingQueryServlet extends AbstractBaseServlet {
   @Override
    public Object process(HttpServletRequest req, HttpServletResponse res) throws Exception {
       Page page=Page.parse(req);
       Building building=new Building();
        List<Building> dorms= BuildingDAO.desc(page,building);
        return dorms;
    }
}
