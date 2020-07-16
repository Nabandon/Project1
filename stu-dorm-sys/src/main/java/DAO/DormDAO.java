package DAO;

import model.DictionaryTag;
import model.Dorm;
import util.DBUtil;

import javax.servlet.http.HttpServletRequest;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class DormDAO {
    public static List<DictionaryTag> query(int id) {
        List<DictionaryTag> list=new ArrayList<>();
        Connection c=null;
        PreparedStatement ps=null;
        ResultSet rs=null;

        //JDBC操作
        try {
            c= DBUtil.getConnection();
            String sql="select d.id,d.dorm_no " +
                    " from building b join dorm d on" +
                    " b.id=d.building_id where b.id=?";
            ps=c.prepareStatement(sql);//执行sql语句；
            ps.setInt(1,id);
            rs=ps.executeQuery();//获取结果集；
            while (rs.next()){
                DictionaryTag dt=new DictionaryTag();
                dt.setDictionaryTagKey(rs.getString("id"));
                dt.setDictionaryTagValue(rs.getString("dorm_no"));
                list.add(dt);
            }
        } catch (Exception e) {
            throw new RuntimeException("查询宿舍字典出错",e);
        } finally {
            DBUtil.close( c, ps,rs);
        }
        return list;
    }

    public static List<Dorm> desc() {
        List<Dorm> list=new ArrayList<>();
        Connection c=null;
        PreparedStatement ps=null;
        ResultSet rs=null;

        //JDBC操作
        try {
            c= DBUtil.getConnection();
            String sql="select b.building_name, d.building_id, d.id,d.dorm_no,d.dorm_desc,d.create_time " +
                    " from building b join dorm d on" +
                    " b.id=d.building_id ";
            ps=c.prepareStatement(sql);//执行sql语句；

            rs=ps.executeQuery();//获取结果集；
            while (rs.next()){
                Dorm dt=new Dorm();
                dt.setBuildingName(rs.getString("building_name"));
                dt.setBuildingId(rs.getInt("building_id"));
                dt.setId(rs.getInt("id"));
                dt.setDormNo(rs.getString("dorm_no"));
                dt.setDormDesc(rs.getString("dorm_desc"));
                dt.setCreateTime(new Date(rs.getTimestamp("create_time").getTime()));
                list.add(dt);
            }
        } catch (Exception e) {
            throw new RuntimeException("查询宿舍管理出错",e);
        } finally {
            DBUtil.close( c, ps,rs);
        }
        return list;
    }

    public static int add(Dorm dorm) {
        Connection c=null;
        PreparedStatement ps=null;
        ResultSet rs=null;

        //JDBC操作
        try {
            c= DBUtil.getConnection();
            String sql="insert into dorm " +
                    " (building_id,dorm_no,dorm_desc" +
                    ") values (?,?,?)";
            ps=c.prepareStatement(sql);//执行sql语句；
            ps.setInt(1, dorm.getBuildingId());
            ps.setString(2,dorm.getDormNo());
            ps.setString(3,dorm.getDormDesc());
            return ps.executeUpdate();
        } catch (Exception e) {
            throw new RuntimeException("新增宿舍出错",e);
        } finally {
            DBUtil.close( c, ps,rs);
        }
    }

    public static Dorm dormQueryById(int id1)  {

        Dorm dorm=new Dorm();
        Connection c=null;
        PreparedStatement ps=null;
        ResultSet rs=null;

        try {
            c=DBUtil.getConnection();
            String sql="select" +
                    " d.id, b.building_name,d.dorm_no,dorm_desc,d.building_id,d.create_time" +
                    " from dorm d join building b on b.id=d.building_id  where d.id=? " ;

            ps=c.prepareStatement(sql);
            ps.setInt(1,id1);
            rs=ps.executeQuery();
            while (rs.next()) {
                dorm.setId(rs.getInt("id"));
                dorm.setBuildingName(rs.getString("building_name"));
                dorm.setBuildingId(rs.getInt("building_id"));
                dorm.setDormNo(rs.getString("dorm_no"));
                dorm.setDormDesc(rs.getString("dorm_desc"));
                dorm.setCreateTime(new Date(rs.getTimestamp("create_time").getTime()));
            }
        } catch (SQLException e) {
            throw new RuntimeException("查询宿舍信息出错",e);
        } finally {
            DBUtil.close(c,ps,rs);
        }
        return dorm;
    }
//
    public static int delet(String[] ids) {
        Connection c=null;
        PreparedStatement ps=null;
        ResultSet rs=null;

        try {
            c=DBUtil.getConnection();
            StringBuilder sql=new StringBuilder("delete from dorm where id in(");
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
            throw new RuntimeException("该宿舍分配的有学生,请妥善处理后再删除该宿舍",e);
        } finally {
            DBUtil.close(c,ps,rs);
        }
    }

//
    public static int dormUpdate(Dorm dorm) {
        Connection c=null;
        PreparedStatement ps=null;
        ResultSet rs=null;

        try {
            c=DBUtil.getConnection();
            String sql="update" +
                    " dorm set building_id=?,dorm_no=?,dorm_desc=?" +
                    " where id=?";
            ps=c.prepareStatement(sql);
            ps.setInt(1,dorm.getBuildingId());
            ps.setString(2,dorm.getDormNo());
            ps.setString(3,dorm.getDormDesc());
            ps.setInt(4,dorm.getId());
            return ps.executeUpdate();
        } catch (Exception e) {
            throw new RuntimeException("修改宿舍信息出错",e);
        } finally {
            DBUtil.close(c,ps,rs);
        }
    }
}

