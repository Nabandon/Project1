package util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;

public class JSONUtil {
    private volatile static ObjectMapper MAPPER;
    /** web程序，前后端之间数据交流，一般通过json数据通信，
     * 这时候会涉及到json数据格式的统一问题，这个时候一般使用ObjectMapper进行重写来统一数据格式。  */
    static {
        getMAPPER().setDateFormat(new SimpleDateFormat("yyyy-mm-dd HH:mm:ss"));//设置时间格式
    }
    public static ObjectMapper getMAPPER(){
       if(MAPPER==null){
           synchronized (JSONUtil.class){
               if(MAPPER==null){
                   MAPPER=new ObjectMapper();
               }
           }
       }
       return MAPPER;
    }
    public static String write(Object o){
        try {
            return getMAPPER().writerWithDefaultPrettyPrinter().writeValueAsString(o);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("序列化出错",e);
        }
    }
    //反序列化输入流中的json字符串 为java对象
    //http请求发送json数据,请求头Content-Type=application/json
    //httpServletRequest获取json字符串,只能通过输入流获取
    //请求体中是json字符串，请求格式是 ...json
    public static  <T> T read(InputStream is,Class<T> valueType){//输入流 ,输出类型;
        try {
            return  getMAPPER().readValue(is,valueType);
        } catch (Exception e) {
            throw new RuntimeException("反序列化json字符串出错",e);
        }
    }
}



