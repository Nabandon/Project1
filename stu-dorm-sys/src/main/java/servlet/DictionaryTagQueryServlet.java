package servlet;

import DAO.DictionaryTagDAO;
import DAO.StudentDao;
import model.DictionaryTag;
import model.Student;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@WebServlet("/dict/tag/query")
//下拉菜单
public class DictionaryTagQueryServlet extends AbstractBaseServlet {

    @Override
    public Object process(HttpServletRequest req, HttpServletResponse res) throws Exception {
        String key=req.getParameter("dictionaryKey");
        List<DictionaryTag> dictionaryTags= DictionaryTagDAO.query(key);
        return dictionaryTags;
    }
}
