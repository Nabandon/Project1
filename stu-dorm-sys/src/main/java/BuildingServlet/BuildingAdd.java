package BuildingServlet;

import DAO.BuildingDAO;
import model.Building;
import servlet.AbstractBaseServlet;
import util.JSONUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/building/add")
public class BuildingAdd extends AbstractBaseServlet {

    @Override
    public Object process(HttpServletRequest req, HttpServletResponse res) throws Exception {
        Building building= JSONUtil.read(req.getInputStream(),Building.class);
        BuildingDAO.add(building);
        return null;
    }
}
