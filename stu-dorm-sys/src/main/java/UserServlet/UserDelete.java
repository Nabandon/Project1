package UserServlet;

import DAO.UserDAO;
import servlet.AbstractBaseServlet;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/user/delete")
public class UserDelete extends AbstractBaseServlet {
    @Override
    public Object process(HttpServletRequest req, HttpServletResponse res) throws Exception {
       String[] ids=req.getParameterValues("ids");
       int num= UserDAO.delete(ids);
        return null;
    }
}
