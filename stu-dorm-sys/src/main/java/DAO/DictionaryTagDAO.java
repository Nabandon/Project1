package DAO;

import model.DictionaryTag;
import model.Student;
import util.DBUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class DictionaryTagDAO {

    public static List<DictionaryTag> query(String key) {
        List<DictionaryTag> list=new ArrayList<>();
        Connection c=null;
        PreparedStatement ps=null;
        ResultSet rs=null;

        //JDBC操作
        try {
            c= DBUtil.getConnection();
            String sql="select concat(d.dictionary_key, dt.dictionary_tag_key) dictionary_tag_key," +
                    "       dt.dictionary_tag_value" +
                    " from dictionary d" +
                    "         join dictionary_tag dt on" +
                    "    d.id = dt.dictionary_id" +
                    " where d.dictionary_key =? ";
            ps=c.prepareStatement(sql);//执行sql语句；
            ps.setString(1,key);//设置值
            rs=ps.executeQuery();//获取结果集；
            while (rs.next()){
                DictionaryTag dt=new DictionaryTag();
                dt.setDictionaryTagKey(rs.getString("dictionary_tag_key"));
                dt.setDictionaryTagValue(rs.getString("dictionary_tag_value"));
                list.add(dt);
            }
        } catch (Exception e) {
            throw new RuntimeException("查询数据字典标签出错",e);
        } finally {
            DBUtil.close( c, ps,rs);
        }
        return list;
    }
    }

