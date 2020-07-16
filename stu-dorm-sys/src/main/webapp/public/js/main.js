function logout(){
    $.ajax({
        url: "user/logout",
        contentType: "application/json",
        success: function (r) {
            showSuccessModal("注销成功", function () {
                window.location.href = "public/index.html";
            });
        },
        error: function (error) {
            showError(error);
        }
    });
    return false;
}

/**
 * 宿舍楼管理
 */
let buildingTabOptions = {
    id: "building_table",//表格id
    url:'building/query',//表格查询url
    toolbar: [{
        type: "add",//新增按钮
        title: "新增宿舍楼",//弹出框标题
        url: "building/add",//弹出框提交url
        invisible:["dormCount", "createTime"],//弹出框不展示的字段
    },{
        type: "update",//修改按钮
        title: "修改宿舍楼",
        queryUrl: "building/queryById",//弹出框初始化数据url
        url: "building/update",
        invisible:["dormCount", "createTime"],
    },{
        type: "delete",//删除按钮
        url: "building/delete",
    }],
    columns: [{
        checkbox: true
    },{
        title: '宿舍名称',
        field: "buildingName",
        switchable: false,//表格是否允许不展示列
        sortable: true,//表格字段是否可排序
        required: true,//新增/修改时，字段是否必填
        tooltip: "请输入宿舍名称",//提交时字段验证提示内容
    },{
        title: '描述',
        field: 'buildingDesc',
    },{
        title: '寝室数量',
        field: 'dormCount',
    },{
        title: '创建时间',
        field: 'createTime',
    }],
};

/**
 * 寝室管理
 */
let dormTabOptions = {
    id: "dorm_table",//表格id
    url:'dorm/query',//表格查询url
    toolbar: [{
        type: "add",//新增按钮
        title: "新增寝室",//弹出框标题
        url: "dorm/add",//弹出框提交url
        invisible:["buildingName", "createTime"],//弹出框不展示的字段
    },{
        type: "update",//修改按钮
        title: "修改寝室",
        queryUrl: "dorm/queryById",//弹出框初始化数据url
        url: "dorm/update",
        invisible:["buildingName", "createTime"],
    },{
        type: "delete",//删除按钮
        url: "dorm/delete",
    }],
    columns: [{
        checkbox: true
    },{
        title: '宿舍楼',
        field: 'buildingName',
        switchable: false,//表格是否允许不展示列
        sortable: true,//表格字段是否可排序
    },{
        title: '宿舍楼',
        field: 'buildingId',
        type: "select",//新增/修改时，字段为下拉菜单
        url: "building/queryAsDict",//新增/修改时，下拉菜单初始化数据url
        visible: false,//表格不显示，新增/修改弹出框使用
        switchable: false,//表格是否允许不展示列
        required: true,//新增/修改时，字段是否必填
        tooltip: "请选择宿舍楼",//提交时字段验证提示内容（下拉菜单的错误提示暂时不能显示 TODO）
    },{
        title: '寝室房号',
        field: "dormNo",
        switchable: false,//表格是否允许不展示列
        sortable: true,//表格字段是否可排序
        required: true,//新增/修改时，字段是否必填
        tooltip: "请输入房号",//提交时字段验证提示内容
    },{
        title: '描述',
        field: 'dormDesc',
    },{
        title: '创建时间',
        field: 'createTime',
    }],
};

/**
 * 学生管理
 */
let stuTabOptions = {
    id: "stu_table",//表格id
    url:'student/query',//表格查询url
    toolbar: [{
        type: "add",//新增按钮
        title: "新增学生",//弹出框标题
        url: "student/add",//弹出框提交url
        invisible:["buildingName", "dormNo", "createTime"],//弹出框不展示的字段
    },{
        type: "update",//修改按钮
        title: "修改学生",
        queryUrl: "student/queryById",//弹出框初始化数据url
        url: "student/update",
        invisible:["buildingName", "dormNo", "createTime"],
    },{
        type: "delete",//删除按钮
        url: "student/delete",
    },{
        type: "custom",
        id: "custom_apply_stu",
        title: "分配宿舍",
        url: "student/apply",
        disableCount: 0,//表格选中多少行数据时，禁用按钮
        invisible:["studentName", "studentGraduateYear", "studentMajor", "studentEmail", "buildingName", "dormNo", "createTime"],//弹出框不展示的字段
        requireFields: ["buildingId", "dormId"],
    }],
    columns: [{
        checkbox: true
    },{
        title: '姓名',
        field: "studentName",
        switchable: false,//表格是否允许不展示列
        sortable: true,//表格字段是否可排序
        required: true,//新增/修改时，字段是否必填
        tooltip: "请输入学生姓名",//提交时字段验证提示内容
    },{
        title: '毕业年份',
        field: 'studentGraduateYear',
        type: "select",//新增/修改时，字段为下拉菜单
        dictionaryKey: "000001",//数据字典键
        sortable: true,
    },{
        title: '专业',
        field: 'studentMajor',
        type: "select",//新增/修改时，字段为下拉菜单
        dictionaryKey: "000002",//数据字典键
    },{
        title: '邮箱',
        field: 'studentEmail',
    },{
        title: '宿舍楼',
        field: 'buildingName',
    },{
        title: '宿舍楼',
        field: 'buildingId',
        type: "select",//新增/修改时，字段为下拉菜单
        url: "building/queryAsDict",//新增/修改时，下拉菜单初始化数据url
        visible: false,//表格不显示，新增/修改弹出框使用
        switchable: false,//表格是否允许不展示列
        search: true,//下拉菜单是否可搜索
        // required: true,//新增/修改时，字段是否必填
        // tooltip: "请选择宿舍楼",//提交时字段验证提示内容
    },{
        title: '房间号',
        field: 'dormNo',
    },{
        title: '房间号',
        field: 'dormId',
        type: "select",//新增/修改时，字段为下拉菜单
        url: "dorm/queryAsDict",//新增/修改时，下拉菜单初始化数据url
        visible: false,//表格不显示，新增/修改弹出框使用
        switchable: false,//表格是否允许不展示列
        search: true,//下拉菜单是否可搜索
        relatedSelect: "buildingId",
        // required: true,//新增/修改时，字段是否必填
        // tooltip: "请选择宿舍楼",//提交时字段验证提示内容
    },{
        title: '创建时间',
        field: 'createTime',
        // type: "datetime",
        // disabled: true,
        // formatter: function(value, item, index) {
        //     return value;
        // },
    }],
};

/**
 * 用户管理
 */
let userTabOptions = {
    id: "user_table",//表格id
    url:'user/query',//表格查询url
    toolbar: [{
        type: "add",//新增按钮
        title: "新增用户",//弹出框标题
        url: "user/register",//弹出框提交url
        invisible:[],//弹出框不展示的字段
    },{
        type: "update",//修改按钮
        title: "修改用户",
        queryUrl: "user/queryById",//弹出框初始化数据url
        url: "user/update",
        invisible:[],
    },{
        type: "delete",//删除按钮
        url: "user/delete",
    }],
    columns: [{
        checkbox: true
    },{
        title: '用户账号',
        field: "username",
        switchable: false,//表格是否允许不展示列
        sortable: true,//表格字段是否可排序
        required: true,//新增/修改时，字段是否必填
        tooltip: "请输入用户账号",//提交时字段验证提示内容
    },{
        title: '密码',
        field: 'password',
    },{
        title: '用户昵称',
        field: 'nickname',
    },{
        title: '邮箱',
        field: 'email',
    },{
        title: '创建时间',
        field: 'createTime',
        type: "datetime",
        // disabled: true,
        // formatter: function(value, item, index) {
        //     return value;
        // },
    }],
};

$(function () {
    setTableDefaultSettings();
    initNav("main_nav", [{
        id: "building_tab",
        init: function () {
            initTable(buildingTabOptions);
        }
    },{
        id: "dorm_tab",
        init: function () {
            initTable(dormTabOptions);
        },
        default: true
    },{
        id: "stu_tab",
        init: function () {
            initTable(stuTabOptions);
        },
    },{
        id: "user_tab",
        init: function () {
            initTable(userTabOptions);
        },
    },{
        id: "settings_tab",
        init: function () {
        },
    }]);
});