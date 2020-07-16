package UserServlet;

import DAO.UserDAO;
import model.User;
import servlet.AbstractBaseServlet;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@WebServlet("/user/query")
public class UserQuery extends AbstractBaseServlet {
    @Override
    public Object process(HttpServletRequest req, HttpServletResponse res) throws Exception {
        List<User> list= UserDAO.queryList();
        return list;
    }
}
