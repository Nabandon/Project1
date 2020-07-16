package DAO;

import model.Dorm;
import model.User;
import util.DBUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class UserDAO {
    public static User query(User user) {
        User userQ=null;
        Connection c=null;
        PreparedStatement ps=null;
        ResultSet rs=null;
        try {
            c= DBUtil.getConnection();
            String sql="select id,nickname,email from user " +
                    " where username=? and password=?";
            ps=c.prepareStatement(sql);//执行sql语句；
            ps.setString(1,user.getUsername());
            ps.setString(2,user.getPassword());
            rs=ps.executeQuery();//获取结果集；
            while (rs.next()){
                userQ=user;
                userQ.setId(rs.getInt("id"));
                userQ.setNickname(rs.getString("nickname"));
                userQ.setEmail(rs.getString("email"));

            }
        } catch (Exception e) {
            throw new RuntimeException("用户名和密码验证错误",e);
        } finally {
            DBUtil.close( c, ps,rs);
        }
        return userQ;
    }

    public static int register(User user) {
        Connection c=null;
        PreparedStatement ps=null;
        ResultSet rs=null;

        //JDBC操作
        try {
            c= DBUtil.getConnection();
            String sql="insert into user " +
                    " (username,password,email,nickname" +
                    ") values (?,?,?,?)";
            ps=c.prepareStatement(sql);//执行sql语句；
            ps.setString(1, user.getUsername());
            ps.setString(2,user.getPassword());
            ps.setString(3,user.getEmail());
            ps.setString(4,user.getNickname());
            return ps.executeUpdate();
        } catch (Exception e) {
            throw new RuntimeException("注册用户出错",e);
        } finally {
            DBUtil.close( c, ps,rs);
        }
    }

    public static List<User> queryList() {
        List<User> list=new ArrayList<>();
        Connection c=null;
        PreparedStatement ps=null;
        ResultSet rs=null;

        //JDBC操作
        try {
            c= DBUtil.getConnection();
            String sql="select id,username,password,nickname,email,create_time" +
                    " from user ";
            ps=c.prepareStatement(sql);//执行sql语句；

            rs=ps.executeQuery();//获取结果集；
            while (rs.next()){
                User dt=new User();
                dt.setId(rs.getInt("id"));
                dt.setUsername(rs.getString("username"));
                dt.setPassword(rs.getString("password"));
                dt.setNickname(rs.getString("nickname"));
                dt.setEmail(rs.getString("email"));
                dt.setCreateTime(new Date(rs.getTimestamp("create_time").getTime()));
                list.add(dt);
            }
        } catch (Exception e) {
            throw new RuntimeException("查询用户管理出错",e);
        } finally {
            DBUtil.close( c, ps,rs);
        }
        return list;
    }

    public static User queryById(int id1) {
        User user=new User();
        Connection c=null;
        PreparedStatement ps=null;
        ResultSet rs=null;

        try {
            c=DBUtil.getConnection();
            String sql="select id,username,password,nickname,email,create_time " +
                    "  from user where id=?" ;

            ps=c.prepareStatement(sql);
            ps.setInt(1,id1);
            rs=ps.executeQuery();
            while (rs.next()) {
                user.setId(rs.getInt("id"));
                user.setUsername(rs.getString("username"));
                user.setPassword(rs.getString("password"));
                user.setNickname(rs.getString("nickname"));
                user.setEmail(rs.getString("email"));
                user.setCreateTime(new Date(rs.getTimestamp("create_time").getTime()));
            }
        } catch (SQLException e) {
            throw new RuntimeException("查询用户详细信息出错",e);
        } finally {
            DBUtil.close(c,ps,rs);
        }
        return user;
    }

    public static void update(User user) {
        Connection c=null;
        PreparedStatement ps=null;
        ResultSet rs=null;

        try {
            c=DBUtil.getConnection();
            String sql="update" +
                    " user set username=?,password=?,nickname=?,email=?" +
                    " where id=?";
            ps=c.prepareStatement(sql);
            ps.setString(1,user.getUsername());
            ps.setString(2,user.getPassword());
            ps.setString(3,user.getNickname());
            ps.setString(4,user.getEmail());


            ps.setInt(5,user.getId());
            ps.executeUpdate();
        } catch (Exception e) {
            throw new RuntimeException("修改宿舍信息出错",e);
        } finally {
            DBUtil.close(c,ps,rs);
        }
    }

    public static int delete(String[] ids) {
        Connection c=null;
        PreparedStatement ps=null;
        ResultSet rs=null;

        try {
            c=DBUtil.getConnection();
            StringBuilder sql=new StringBuilder("delete from user where id in(");
            for(int i=0;i<ids.length;i++){
                if(i!=0){
                    sql.append(",");
                }
                sql.append("?");
            }
            sql.append(")");
            ps=c.prepareStatement(sql.toString());
            for(int i=0;i<ids.length;i++){
                ps.setInt(i+1,Integer.parseInt(ids[i]));
            }
            return ps.executeUpdate();
        } catch (Exception e) {
            throw new RuntimeException("删除用户信息出错",e);
        } finally {
            DBUtil.close(c,ps,rs);
        }
    }
}
