package servlet;

import DAO.BuildingDAO;
import DAO.DictionaryTagDAO;
import model.Building;
import model.DictionaryTag;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@WebServlet("/building/queryAsDict")
public class BuildingServlet extends AbstractBaseServlet {

    @Override
    public Object process(HttpServletRequest req, HttpServletResponse res) throws Exception {
        List<DictionaryTag> tags= BuildingDAO.query();
        return tags;
    }
}
