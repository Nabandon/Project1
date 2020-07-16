package BuildingServlet;

import DAO.BuildingDAO;
import servlet.AbstractBaseServlet;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/building/delete")
public class BuildingDelete extends AbstractBaseServlet {
    @Override
    public Object process(HttpServletRequest req, HttpServletResponse res) throws Exception {
        String[] ids=req.getParameterValues("ids");
        BuildingDAO.buildingDelete((ids));
        return null;
    }
}
