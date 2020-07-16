package DAO;

import model.Building;
import model.DictionaryTag;
import model.Page;
import util.DBUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class BuildingDAO {
    public static List<DictionaryTag> query() {
        List<DictionaryTag> list=new ArrayList<>();
        Connection c=null;
        PreparedStatement ps=null;
        ResultSet rs=null;

        //JDBC操作
        try {
            c= DBUtil.getConnection();
            String sql="select id,building_name from building";
            ps=c.prepareStatement(sql);//执行sql语句；

            rs=ps.executeQuery();//获取结果集；
            while (rs.next()){
                DictionaryTag dt=new DictionaryTag();
                dt.setDictionaryTagKey(rs.getString("id"));
                dt.setDictionaryTagValue(rs.getString("building_name"));
                list.add(dt);
            }
        } catch (Exception e) {
            throw new RuntimeException("查询宿舍楼字典标签出错",e);
        } finally {
            DBUtil.close( c, ps,rs);
        }
        return list;
    }

    public static List<Building> desc(Page page, Building building) {
        List<Building> list=new ArrayList<>();
        Connection c=null;
        PreparedStatement ps=null;
        ResultSet rs=null;
        PreparedStatement ps2=null;
        ResultSet rs2=null;

        //JDBC操作
        try {
            c= DBUtil.getConnection();
            StringBuilder sql=new StringBuilder( "select building_name,building_desc,create_time " +
                    ",id from building ");
//            if(page.getSearchText()!=null && page.getSearchText().trim().length()>0){
//                sql.append(" where b.building_name like ?");
//            }
//            if(page.getSortOrder() !=null && page.getSortOrder().trim().length()>0){
//
//                sql.append(" order by b.building_name "+ page.getSortOrder());
//            }
            //获取查询数量
//            StringBuilder countSql=new StringBuilder("select count(0) counts from (");
//            countSql.append(sql);
//            countSql.append(") tamp");
//            ps=c.prepareStatement(countSql.toString());
//
//            if(page.getSearchText()!=null && page.getSearchText().trim().length()>0){
//                ps.setString(1,"%"+page.getSortOrder()+"%");
//            }
//            rs=ps.executeQuery();//获取结果集；
//            while (rs.next()){
//                int count =rs.getInt("counts");//返回数据的total字段,当前方法无法通过返回对象设置;
//                //使用ThreadLocal,变量绑定到线程Thread类的ThreadLocalMap类型的属性;
//                ThreadLocalHolder.get().set(count);
//            }
//            //处理业务数据
//            sql.append(" limit ?,?");
//            ps=c.prepareStatement(sql.toString());//执行sql语句；
//            //页码转化为索引;上一页的页码*每页的数量,(索引从0开始)
//            int idx= (page.getPageNumber()-1)*page.getPageSize();
//            int i=1;
//            if(page.getSearchText()!=null && page.getSearchText().trim().length()>0){
//                ps.setString(i++,"%"+page.getSortOrder()+"%");
//            }
//            ps.setInt(i++,idx);
//            ps.setInt(i++,page.getPageSize());
            ps=c.prepareStatement(sql.toString());
            rs=ps.executeQuery();//获取结果集；
            while (rs.next()){
                Building dt=new Building();

                dt.setBuildingName(rs.getString("building_name"));
                dt.setBuildingDesc(rs.getString("building_desc"));
                dt.setId(rs.getInt("id"));
                String sql2="select count(0) counts from building b join dorm d on" +
                        " d.building_id=b.id where b.id=? ";
                ps2=c.prepareStatement(sql2);
                ps2.setInt(1,rs.getInt("id"));
                rs2=ps2.executeQuery();
                while (rs2.next()) {
                    dt.setDormCount(rs2.getInt("counts"));
                }
              //  dt.setDormCount(rs.getInt("counts"));
                dt.setCreateTime(new Date(rs.getTimestamp("create_time").getTime()));
                list.add(dt);
            }

        } catch (Exception e) {
            throw new RuntimeException("查询宿舍楼管理出错",e);
        } finally {
            DBUtil.close( c, ps,rs);
        }
        return list;
    }

    public static int add(Building building) {
        Connection c=null;
        PreparedStatement ps=null;
        ResultSet rs=null;

        try {
            c=DBUtil.getConnection();
            String sql="insert into building (building_name,building_desc) values" +
                    " (?,?)";
            ps=c.prepareStatement(sql);
            ps.setString(1,building.getBuildingName());
            ps.setString(2,building.getBuildingDesc());
            return ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DBUtil.close(c,ps,rs);
        }

        return 0;
    }

    public static Building queryById(int ids)  {
        Building building=new Building();
        Connection c=null;
        PreparedStatement ps=null;
        ResultSet rs=null;

        try {
            c=DBUtil.getConnection();
            String sql="select create_time,id, building_name,building_desc from building where id=?";
            ps=c.prepareStatement(sql);
            ps.setInt(1,ids);
            rs=ps.executeQuery();
            while (rs.next()){

                building.setCreateTime(new Date(rs.getTimestamp("create_time").getTime()));
                building.setId(rs.getInt("id"));
                building.setBuildingName(rs.getString("building_name"));
                building.setBuildingDesc(rs.getString("building_desc"));

            }
        } catch (SQLException e) {
            throw new RuntimeException("查询宿舍楼信息出错",e);
        } finally {
            DBUtil.close(c,ps,rs);
        }
        return building;
    }

    public static int BuildingUpdata(Building building) {
        Connection c=null;
        PreparedStatement ps=null;
        ResultSet rs=null;

        try {
            c=DBUtil.getConnection();
            String sql="update" +
                    " building set building_name=?,building_desc=?" +
                    " where id=?";
            ps=c.prepareStatement(sql);

            ps.setString(1,building.getBuildingName());
            ps.setString(2,building.getBuildingDesc());
            ps.setInt(3,building.getId());
            return ps.executeUpdate();
        } catch (Exception e) {
            throw new RuntimeException("修改宿舍信息出错",e);
        } finally {
            DBUtil.close(c,ps,rs);
        }
    }

    public static int buildingDelete(String[] ids) {
        Connection c=null;
        PreparedStatement ps=null;
        ResultSet rs=null;

        try {
            c=DBUtil.getConnection();
            StringBuilder sql=new StringBuilder("delete from building where id in(");
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
            throw new RuntimeException("该宿舍楼分配的有学生,请妥善处理后再删除该宿舍",e);
        } finally {
            DBUtil.close(c,ps,rs);
        }
    }
}

