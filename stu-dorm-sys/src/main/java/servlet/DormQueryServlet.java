package servlet;

import DAO.BuildingDAO;
import DAO.DormDAO;
import model.DictionaryTag;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@WebServlet("/dorm/queryAsDict")
public class DormQueryServlet extends AbstractBaseServlet {

    @Override
    public Object process(HttpServletRequest req, HttpServletResponse res) throws Exception {
        String key=req.getParameter("dictionaryKey");
        List<DictionaryTag> tags= DormDAO.query(Integer.parseInt(key));
        return tags;
    }
}
