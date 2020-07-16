package UserServlet;

import DAO.UserDAO;
import model.User;
import servlet.AbstractBaseServlet;
import util.JSONUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/user/register")
public class UserRegister extends AbstractBaseServlet {

    @Override
    public Object process(HttpServletRequest req, HttpServletResponse res) throws Exception {
        User user= JSONUtil.read(req.getInputStream(),User.class);
        int num= UserDAO.register(user);
        return null;
    }
}
