package BuildingServlet;

import DAO.BuildingDAO;
import model.Building;
import servlet.AbstractBaseServlet;
import util.JSONUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/building/update")
public class BuildingUpdate extends AbstractBaseServlet {
    @Override
    public Object process(HttpServletRequest req, HttpServletResponse res) throws Exception {
        Building building= JSONUtil.read(req.getInputStream(),Building.class);
        BuildingDAO.BuildingUpdata(building);
        return null;
    }
}
