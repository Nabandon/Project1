package util;

public class ThreadLocalHolder {
    private static final ThreadLocal<Integer> count=new ThreadLocal<>();
    public static ThreadLocal<Integer> get(){
        return count;
    }

}
