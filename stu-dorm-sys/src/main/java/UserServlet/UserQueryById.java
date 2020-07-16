package UserServlet;

import DAO.UserDAO;
import model.User;
import servlet.AbstractBaseServlet;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/user/queryById")
public class UserQueryById extends AbstractBaseServlet {
    @Override
    public Object process(HttpServletRequest req, HttpServletResponse res) throws Exception {
        String id=req.getParameter("id");
        User user= UserDAO.queryById(Integer.parseInt(id));
        return user;
    }
}
