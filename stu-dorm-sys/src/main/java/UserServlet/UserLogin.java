package UserServlet;

import DAO.UserDAO;
import model.User;
import servlet.AbstractBaseServlet;
import util.JSONUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/user/login")
public class UserLogin extends AbstractBaseServlet {
    @Override
    public Object process(HttpServletRequest req, HttpServletResponse res) throws Exception {
        User user = JSONUtil.read(req.getInputStream(), User.class);

        User query = UserDAO.query(user);//从数据库查询出的;
        if (query == null) {
            throw new RuntimeException("用户名或密码错误");
        }
        HttpSession session=req.getSession();//获取Session,获取不到就创建一个
        session.setAttribute("user",query);
        return null;
    }
}
