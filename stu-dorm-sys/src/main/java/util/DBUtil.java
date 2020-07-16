package util;


import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;


import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
//数据库工具类
public class DBUtil {

    private static DataSource DATA_SOURCE;
    //创建数据库连接
    //1.DriverManager每次都是创建数据库物理连接,connection.close()关闭连接
    //2.DataSource初始化就创建一定数量的连接,connection.close()关闭只是重置连接对象,归还连接池
    //DataSource效率更好.
    private static final String URL="jdbc:mysql://localhost:3306/stu_dorm";
    private static final String USERNAME="root";
    private static final String PASSWORD="w1839304120";
    private DBUtil(){};
    private static DataSource getDataSource(){
        if(DATA_SOURCE==null){
            synchronized (frank.util.DBUtil.class){
                if(DATA_SOURCE==null){
                    DATA_SOURCE=new MysqlDataSource();
                    ((MysqlDataSource) DATA_SOURCE).setUrl(URL);
                    ((MysqlDataSource) DATA_SOURCE).setUser(USERNAME);
                    ((MysqlDataSource) DATA_SOURCE).setPassword(PASSWORD);
                }
            }
        }
        return DATA_SOURCE;
    }
    public static Connection getConnection(){

        try {
            return getDataSource().getConnection();
        } catch (SQLException e) {
            throw new RuntimeException("数据库连接失败",e);
        }
    }
    //jdbc
    //(1)创建数据库连接
    //2)创建操作命令对象Statement
    //Statement简单sql语句执行
    // PreparedStatement可以执行带参数的sql,预编译 效率高,一定程度防止SQL注入
    //3)执行SQL
    //4)查询,处理结果集ResultSet
    //5)释放资源(反向释放
    public static void close(Connection c, Statement s, ResultSet r){
        try {
            if(r!=null){
                r.close();
            }
            if(s!=null){
                s.close();
            }
            if(c!=null){
                c.close();
            }
        } catch (SQLException e) {
            throw new RuntimeException("关闭数据库连接失败",e);
        }
    }
    public static void close(Connection c, Statement s){
        close(c,s,null);
    }
}