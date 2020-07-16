package UserServlet;

import DAO.UserDAO;
import model.User;
import servlet.AbstractBaseServlet;
import util.JSONUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/user/update")
public class UserUpdate extends AbstractBaseServlet {
    @Override
    public Object process(HttpServletRequest req, HttpServletResponse res) throws Exception {
        User user= JSONUtil.read(req.getInputStream(),User.class);
        UserDAO.update(user);
        return null;
    }
}
