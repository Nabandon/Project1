/**
 * 1.扩展jQuery方法
 * 2.设置ajax提交的默认处理
 * 3.设置表格的默认配置
 */
(function ($) {
    // 扩展ajax方法，统一处理成功返回的数据
    let _ajax = $.ajax;
    $.ajax = function(opts){
        let extOpts = extendAjaxOptions(opts);
        _ajax(extOpts);
    };
    $.fn.extend({
        serializeJson: function(prefix) {
            let serializeObj = {};
            $(this.serializeArray()).each(function () {
                let name = (prefix == undefined ? this.name : this.name.substring(prefix.length));
                if(serializeObj[name]){//键值对存在
                    if($.isArray(serializeObj[name]))//值为数组
                        serializeObj[name].push(this.value);
                    else
                        serializeObj[name] = [serializeObj[name], this.value];
                }else{
                    serializeObj[name] = this.value;
                }
            });
            $(this).find('select[readonly="readonly"]').each(function () {
                let name = (prefix == undefined ? this.name : this.name.substring(prefix.length));
                serializeObj[name] = $(this).selectpicker('val');
            });
            return serializeObj;
        },
        serializeJsonString: function(prefix) {
            return JSON.stringify(this.serializeJson(prefix));
        }
    });
})(jQuery);

/**
 * 扩展ajax提交的默认处理
 * @param opts
 * @returns {*}
 */
function extendAjaxOptions(opts) {
    // if(!isString(opts.contentType)){
    //     opts.contentType = "application/json;charset=UTF-8";
    // }
    opts.traditional = true;
    if(!isString(opts.dataType)){
        opts.dataType = "json";
    }
    opts._error = opts.error;
    opts.error = function (jqXHR, statusText, errorThrown) {
        let error = {
            type: isString(opts.type) ? opts.type : "get",
            url: opts.url,
            code: jqXHR.status
        };
        //     +"},\nstatusText="+statusText+",\nerrorThrown="+errorThrown);
        switch(jqXHR.status) {
            case 404:
                error.message = "找不到资源";
                break;
            case 405:
                error.message = "不支持的请求方法";
                break;
            case 500:
                error.message = "服务器出错啦";
                error.stackTrace = jqXHR.statusText;
                break;
            default:
                error.message = "未知的错误";
                error.stackTrace = jqXHR.statusText;
                break;
        }
        if(typeof opts._error === 'function')
            opts._error(error);
        else
            showError(error);
    }
    opts._success = opts.success;
    opts.success = function (result, textStatus, jqXHR) {
        if(result.success === true){
            opts._success(result);
        }else{
            result.type = isString(opts.type) ? opts.type : "get";
            result.url = opts.url;
            if(typeof opts._error === 'function')
                opts._error(result);
            else
                showError(result);
        }
    };
    return opts;
}

/**
 * 设置表格默认配置
 */
function setTableDefaultSettings() {
    $.extend($.fn.bootstrapTable.defaults, {

        /*======================基础设置======================*/
        //表的类名：'table', 'table-bordered', 'table-hover', 'table-striped', 'table-dark', 'table-sm' 和 'table-borderless' 可被使用。默认:'table table-bordered table-hover'
        classes: "table table-hover",
        //表头的类名：thead-light（浅灰色）或 thead-dark（深灰色）
        theadClasses: "thead-light",
        //表的高度，启用表的固定标题。
        height: 510,

        /*======================排序设置======================*/
        //是否启用排序
        sortable: true,
        //排序方式
        sortOrder: "asc",

        /*======================ajax设置======================*/
        //设置false为禁用AJAX请求的缓存。默认:true
        cache: false,

        //设置'limit'为发送具有RESTFul类型的查询参数。默认:'limit'
        // queryParamsType:'limit',//"search":"","order":"asc","offset":0,"limit":10
        queryParamsType:'',//"searchText":"","sortOrder":"asc","pageSize":10,"pageNumber":

        //为每一行指示唯一的标识符。
        uniqueId: "id",
        //键入包含'total'数据的传入json。默认:'total'
        // totalField: "total",
        //键入包含'rows'数据列表的传入json。默认:'rows'
        dataField: "data",
        //在加载远程数据之前，处理响应数据格式，参数对象包含：res: 响应数据。jqXHR: jqXHR对象，它是XMLHTTPRequest对象的超集。
        // responseHandler: function (response) {
        //     return{
        //         "total": response.total,
        //         "rows": response.data
        //     }
        // },
        //在加载远程数据时发生某些错误时触发，参数包含：status: 状态代码。jqXHR:jqXHR对象
        onLoadError: function (status, jqXHR) {
            showError(jqXHR);
        },

        /*======================分页设置======================*/
        //设置true 为在表格底部显示分页工具栏。默认:false
        pagination: true,
        //定义表格的侧面分页，只能是'client' 或 'server'。使用 'server'side需要设置'url' 或 'ajax' 选项。默认:'client'
        sidePagination: "server",
        //设置分页属性时，请初始化页码。
        pageNumber:1,
        //设置分页属性时，初始化页面大小。
        pageSize: 7,
        //设置分页属性时，初始化页面尺寸选择列表。默认:[10, 25, 50, 100]
        pageList: [5, 7, 10, 20],

        /*======================工具栏设置======================*/
        //所有按钮都将在其上显示图标
        showButtonIcons: true,
        //启用搜索输入。默认:false
        search: true,
        //搜索方法将一直执行到按下Enter键。
        searchOnEnterKey: true,
        //设置true 为显示列下拉列表。我们可以将 switchable选项设置false为隐藏下拉列
        showColumns: true,
        //从列下拉列表中隐藏的最小列数。默认:1
        // minimumCountColumns: 1,
        //设置true为显示刷新按钮。
        showRefresh: true,
        //设置true显示全屏按钮。
        showFullscreen: true,
        //设置true 为在单击行时选择复选框或单选框。
        clickToSelect: true,
        //设置true显示切换按钮以切换表格/卡片视图。
        showToggle: true,
        //设置true 为显示名片视图表，例如移动视图。
        // cardView: false,
        //设置true为显示详细视图表。
        // detailView: false,
    });
}

/**
 * 判断是否为字符串
 * @param str
 * @returns {boolean|boolean}
 */
function isString(str) {
    return typeof str === "string" && str.length > 0;
}

/**
 * 初始化导航面板
 * @param pid
 * @param options
 */
function initNav(pid, options){
    $('#'+pid+' a[data-toggle="tab"]').on('click', function (e) {
        e.preventDefault();
        $(this).tab('show');
        for(let option of options){
            if(this.id === option.id && !option.hasInit && option.init != undefined){
                //初始化方法调用
                option.init();
                option.hasInit = true;
            }
        }
    });
    $('#'+pid+' a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        for(let option of options){
            if(this.id === option.id && option.active == false){
                $(e.target).removeClass("active");
            }
        }
    });
    $('#'+pid+' a[data-toggle="tab"]').each(function () {
        for(let option of options){
            if(this.id === option.id && option.default == true){
                $(this).click();
            }
        }
    });
    // $('#'+pid+' a[data-toggle="tab"]:first').click();

    // $('#main_nav a[data-toggle="tab"]').on('click', function (e) {
    //     console.log("=================================");
    //     console.log("点击");
    //     console.log(e.target.nodeName);//获取事件触发元素标签名（li，p，div，img，button…）
    //     console.log(e.target.id);//获取事件触发元素id
    //     console.log(e.target.className);//获取事件触发元素classname
    //     console.log(e.target.innerHTML);//获取事件触发元素的内容（li）
    //     e.preventDefault();
    //     $(this).tab('show');
    // });
    // // 老选项卡隐藏之前：e.target为老选项卡dom对象，e.relatedTarget为新选项卡dom对象
    // $('#main_nav a[data-toggle="tab"]').on('hide.bs.tab', function (e) {
    //     console.log("=================================");
    //     console.log("老选项卡隐藏之前");
    //     console.log(e.target.nodeName);//获取事件触发元素标签名（li，p，div，img，button…）
    //     console.log(e.target.id);//获取事件触发元素id
    //     console.log(e.target.className);//获取事件触发元素classname
    //     console.log(e.target.innerHTML);//获取事件触发元素的内容（li）
    //     console.log(e.target);
    //     console.log(e.relatedTarget);
    // });
    // // 新选项卡显示之前：e.target为新选项卡dom对象，e.relatedTarget为老选项卡dom对象
    // $('#main_nav a[data-toggle="tab"]').on('show.bs.tab', function (e) {
    //     console.log("=================================");
    //     console.log("新选项卡显示之前");
    //     console.log(e.target.nodeName);//获取事件触发元素标签名（li，p，div，img，button…）
    //     console.log(e.target.id);//获取事件触发元素id
    //     console.log(e.target.className);//获取事件触发元素classname
    //     console.log(e.target.innerHTML);//获取事件触发元素的内容（li）
    //     console.log(e.relatedTarget);
    //     console.log(e.target);
    // });
    // // 老选项卡隐藏之后：e.target为老选项卡dom对象，e.relatedTarget为新选项卡dom对象
    // $('#main_nav a[data-toggle="tab"]').on('hidden.bs.tab', function (e) {
    //     console.log("=================================");
    //     console.log("老选项卡隐藏之后");
    //     console.log(e.target.nodeName);//获取事件触发元素标签名（li，p，div，img，button…）
    //     console.log(e.target.id);//获取事件触发元素id
    //     console.log(e.target.className);//获取事件触发元素classname
    //     console.log(e.target.innerHTML);//获取事件触发元素的内容（li）
    //     console.log(e.target);
    //     console.log(e.relatedTarget);
    // });
    // // 新选项卡显示之后：e.target为新选项卡dom对象，e.relatedTarget为老选项卡dom对象
    // $('#main_nav a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    //     if("settings_tab" == e.target.id){
    //         // console.log(e.target.className);
    //         // $(e.target).removeClass("active");
    //         // $(e.target).attr("aria-selected", "false");
    //         $(e.target).removeClass("active");
    //     }
    //     console.log("=================================");
    //     console.log("新选项卡显示之后");
    //     console.log(e.target.nodeName);//获取事件触发元素标签名（li，p，div，img，button…）
    //     console.log(e.target.id);//获取事件触发元素id
    //     console.log(e.target.className);//获取事件触发元素classname
    //     console.log(e.target.innerHTML);//获取事件触发元素的内容（li）
    //     console.log(e.relatedTarget);
    //     console.log(e.target);
    // });
}

/**
 * 页面加载完成后执行
 */
$(function () {
    initError("main_fail_modal");
    initSuccessModal();
});

let APP = {
    dictTagUrl: "dict/tag/query",
};

/**
 * 初始化ajax提交出错时显示的模态框
 * @param modalId 模态框id
 */
function initError(modalId) {
    let content;
    content =   '<div class="modal fade" id="'+modalId+'" tabindex="-1" role="dialog" aria-labelledby="'+modalId+'_title" data-backdrop="static" style="z-index: 2000">';
    content +=      '<div id="'+modalId+'_dialog" class="modal-dialog modal-lg modal-dialog-scrollable" role="document" aria-hidden="true">';

    content +=          '<div class="modal-content">';

    content +=              '<div class="modal-header">';
    content +=                  '<h5 class="modal-title" id="'+modalId+'_title">错误提示</h5>';
    content +=                  '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
    content +=                      '<span aria-hidden="true">&times;</span>';
    content +=                  '</button>';
    content +=              '</div>';

    content +=              '<div class="modal-body">';
    content +=                  generateErrorContent(modalId);
    content +=              '</div>';

    content +=              '<div class="modal-footer">';
    content +=                  '<button type="button" class="btn btn-secondary mr-auto" data-dismiss="modal">关闭</button>';
    content +=              '</div>';

    content +=          '</div>';
    content +=      '</div>';
    content +=  '</div>';
    $("body").append(content);
}

/**
 * 生成ajax提交错误时，要显示的错误信息页面内容
 * @param pid 父容器id
 * @returns {string} 错误信息页面内容
 */
function generateErrorContent(pid) {
    let content = '';
    content +=  '<div id="'+pid+'_message"></div>';
    content +=  '<div id="'+pid+'_dev_div">';
    content +=      '<a class="btn btn-danger btn-sm mr-2" role="button" data-toggle="collapse" href="#'+pid+'_trace" aria-expanded="false" aria-controls="'+pid+'_trace">查看错误信息</a>';
    // content +=      '<i id="'+pid+'_copy_stack_trace" class="btn btn-secondary btn-sm fas fa-copy" data-clipboard-target="#'+pid+'_stack_trace"></i>';
    content +=      '<button id="'+pid+'_copy_stack_trace" type="button" class="btn btn-secondary btn-sm"  data-clipboard-target="#'+pid+'_stack_trace"><i class="fas fa-copy"></i></button>';
    // content +=      '<i id="'+pid+'_copy_stack_trace" type="button" class="btn btn-secondary btn-sm mr-1 fas fa-copy" data-clipboard-target="#'+pid+'_stack_trace"></i>';
    content +=      '<div class="collapse pt-3" id="'+pid+'_trace"></div>';
    content +=  '</div>';
    return content;
}

/**
 * 初始化错误信息div、错误堆栈div的页面属性
 * @param pid 父容器id
 */
function initErrorContent(pid) {
    $("#"+pid+"_message").hide();
    $("#"+pid+"_dev_div").hide();
    $("#"+pid+"_trace").html();
    $("#"+pid+"_trace").collapse("hide");
}

/**
 * ajax提交时错误时，显示错误信息
 * @param error 错误对象
 * @param pid 显示错误的父容器id，默认为main_fail_modal
 */
function showError(error, pid) {
    if(pid == undefined)
        pid = "main_fail_modal";
    if(pid === 'main_fail_modal')
        $('#'+pid).modal('show');
    initErrorContent(pid);
    let message = '';
    message +=  '<p class="text-monospace text-danger">';
    message +=      error.type.toUpperCase()+' '+error.url;
    message +=      '<br>';
    message +=      (isString(error.code) ? error.code+"：" : "");
    message +=      (isString(error.message) ? error.message : "未知错误");
    message +=  '</p>';
    $("#"+pid+"_message").html(message);
    $("#"+pid+"_message").show();
    if(isString(error.stackTrace)){
        message = '';
        message +=  '<div class="card card-body">';
        message +=      '<code id="'+pid+'_stack_trace">';
        message +=          error.stackTrace.replace(/\r\n/g, "<br>");
        message +=      '</code>';
        message +=  '</div>';
        $("#"+pid+"_trace").html(message);
        initClipboard(pid+"_copy_stack_trace", pid);
        $("#"+pid+"_dev_div").show();
    }
}

/**
 * 初始化错误信息中，堆栈信息的复制按钮
 * @param copyDomId 复制按钮id
 * @param pid 父容器id
 */
function initClipboard(copyDomId, pid) {
    let data = {
        text: function(trigger) {
            return $($("#"+copyDomId).attr("data-clipboard-target")).html().replace(/<br>/g, "\r\n");
        }
    };
    if(pid)
        data.container = document.getElementById(pid);
    let clipboard = new ClipboardJS("#"+copyDomId, data);
    $("#"+copyDomId)
        // .attr('data-toggle', 'tooltip')
        .attr('data-placement', 'right')
        .attr('data-original-title', '复制到粘贴板')
        .mouseenter(function () {
            $(this).tooltip('show');
        })
        .mouseleave(function () {
            $(this).attr('data-original-title', '复制到粘贴板');
        });

    clipboard.on('success', function(e) {
        e.clearSelection();
        $(e.trigger)
            .attr('data-original-title', '已复制')
            .tooltip('show');
    });
    clipboard.on('error', function(e) {
        e.clearSelection();
        $(e.trigger)
            .attr('data-original-title', '复制失败，还是用Ctrl+C复制吧')
            .tooltip('show');
    });
}

/**
 * 初始化ajax提交成功模态框
 */
function initSuccessModal() {
    let content = '';
    // content +=   '<div class="container">';
    content +=      '<div class="modal fade" id="'+successModal.id+'" tabindex="-1" role="dialog" data-backdrop="static" style="z-index: 2000">';
    content +=          '<div class="modal-dialog modal-sm" role="document" aria-hidden="true">';
    content +=              '<div class="modal-content text-center" style="height: 30px;">';
    content +=                  '<p class="text-success">';
    content +=                      '<i class="far fa-hand-peace mr-2" style="top: auto; left: auto;"></i>';
    content +=                      '<label id="'+successModal.id+'_title"></label>';
    content +=                  '</p>';
    content +=              '</div>';
    content +=          '</div>';
    content +=      '</div>';
    // content +=  '</div>';
    $("body").append(content);
    $('#'+successModal.id).on('shown.bs.modal', function (e) {
        let hook = successModal.hook();
        hook();
    })
}

let successModal = {
    id: "main_success_modal",
    defaultTimeout: 200,
    hook: function(){
        let timeout = successModal.timeout ? successModal.timeout : successModal.defaultTimeout;
        return function () {
            setTimeout(function() {
                $("#"+successModal.id).modal("hide");
                if(successModal.callback != undefined)
                    successModal.callback();
            }, timeout);
        }
    },
    show: function (opts) {
        opts = opts ? opts : {};
        successModal.timeout = opts.timeout;
        successModal.callback = opts.callback;
        $("#"+successModal.id+"_title").html(opts.content ? opts.content : "操作成功");
        $('#'+successModal.id).modal('show');
    }
};

/**
 * 显示ajax提交成功模态框
 * @param content 内容
 */
function showSuccessModal(content, callback, timeout) {
    successModal.show({
        content: content,
        callback: callback,
        timeout: timeout,
    });
}

/**
 * 初始化确认模态框
 * @param opts 配置包括id（绑定元素的id）、title（标题）、body（内容）、confirm（提交事件）
 */
function initConfirmModal(opts){
    let id = opts.id+"_confirm_modal";
    let content = '';
    content +=  '<div class="modal fade" id="'+id+'" tabindex="-1" role="dialog" aria-labelledby="'+id+'_title">';
    content +=      '<div class="modal-dialog" role="document">';

    content +=          '<div class="modal-content">';

    content +=              '<div class="modal-header">';
    content +=                  '<h5 class="modal-title" id="'+id+'_title"></h5>';
    content +=                  '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
    content +=                      '<span aria-hidden="true">&times;</span>';
    content +=                  '</button>';
    content +=              '</div>';

    content +=              '<div class="modal-body">';
    content +=                  '<label id="'+id+'_body"></label>';
    content +=              '</div>';

    content +=              '<div class="modal-footer">';
    content +=                  '<button type="button" id="'+id+'_submit" class="btn btn-primary" data-dismiss="modal">确认</button>';
    content +=                  '<button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>';
    content +=              '</div>';

    content +=          '</div>';
    content +=      '</div>';
    content +=  '</div>';
    $("body").append(content);
    $("#"+id+"_title").html(isString(opts.title) ? opts.title : "确认提示");
    $("#"+id+"_body").html(opts.body);
    $("#"+id+"_submit").click(function () {
        opts.confirm();
    });
}

/**
 * 弹出确认模态框
 * @param bindDomId 绑定元素的id
 */
function showConfirmModal(bindDomId) {
    $("#"+bindDomId+"_confirm_modal").modal("show");
}

/**
 * 验证表单
 * @param form 表单dom元素
 * @param event 表单提交事件
 * @returns {boolean} 是否验证成功
 */
function validateForm(form, event) {
    const valid = form.checkValidity();
    if (valid === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    form.classList.add('was-validated');
    // $("#"+form.id+" .selectpicker").addClass('is-invalid').selectpicker('setStyle');
    return valid;
}

/**
 * 初始化表格
 * @param tableId 表格id
 * @param opts 表格配置
 */
function initTable(opts) {
    let promises = promiseSelectColumn(opts);
    initToolbar(opts);
    $.when.apply(this, promises).done(function () {
        for(let column of arguments)
            setColumnFormatter(column);
        $("#"+opts.id).bootstrapTable(opts);
    }).fail(function () {
        for(let error of arguments){
            showError(error);
        }
    });
}

/**
 * 获取表格列中设置的数据字典数据，并添加到列属性中
 * @param opts 表格属性
 */
function promiseSelectColumn(opts) {
    let promises = new Array();
    for(let column of opts.columns){
        if(column.type == 'select'
            && column.visible != false
            && ((column.url == undefined && column.dictionaryKey != undefined)
                || column.relatedSelect == undefined)){
            promises.push(promiseAjaxDictionaryTags(column));
        }
    }
    return promises;
}

/**
 * 设置表单列的formatter显示内容
 * @param column
 */
function setColumnFormatter(column) {
    column.formatter = function(value, item, index) {
        if(value == undefined){
            value = parseField(item, column.field);
        }
        if(column.dictionary != undefined){
            for(let option of column.dictionary){
                if(option.dictionaryTagKey == value)
                    return option.dictionaryTagValue;
            }
        }
        return '-';
    }
}

/**
 * 获取多级json属性值
 * @param item
 * @param field
 * @returns {*}
 */
function parseField(item, field) {
    let idx;
    let value = item;
    while((idx = field.indexOf(".")) != -1){
        value = value[field.substring(0, idx)];
        field = field.substring(idx+1);
    }
    if(value != undefined)
        value = value[field];
    return value;
}

/**
 * 查询数据字典数据
 * @param url 请求的url
 * @param dictionaryKey 数据字典键
 * @returns 数据字典数据
 */
function promiseAjaxDictionaryTags(column) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: (column.url == undefined ? APP.dictTagUrl : column.url),
            data: (isString(column.dictionaryKey) ? {"dictionaryKey": column.dictionaryKey} : undefined),
            success: function (r) {
                // console.log("query "+this.url+": "+JSON.stringify(r.data));
                column.dictionary = r.data;
                resolve(column);
            },
            error: function (jqXHR, statusText, errorThrown) {
                reject(jqXHR);
            }
        });
    });
}

/**
 * 初始化新增/修改/删除按钮
 * @param tableId 表格id
 * @param opts 表格配置，opts.toolbar指定自定义元素id时，不生成工具按钮
 */
function initToolbar(opts) {
    let tableId = opts.id;
    let toolbars = opts.toolbar;
    let columns = opts.columns;
    if(isString(toolbars) || !Array.isArray(toolbars) || toolbars.length == 0)
        return;
    let content =           '<div id="'+tableId+'_toolbar" role="toolbar">';
    for(let toolbar of toolbars){
        switch(toolbar.type){
            case "add":
                toolbar.id = tableId+'_toolbar_add';
                content +=      '<div class="btn-group mr-1" role="group">';
                content +=          '<button id="'+toolbar.id+'" type="button" class="btn btn-success">新增</button>';
                content +=      '</div>';
                toolbar.init = function () {
                    initToolbarModal(tableId, toolbar, columns);
                };
                break;
            case "update":
                toolbar.id = tableId+'_toolbar_update';
                content +=      '<div class="btn-group mr-1" role="group">';
                content +=          '<button id="'+toolbar.id+'" type="button" class="btn btn-success">修改</button>';
                content +=      '</div>';
                toolbar.enableCount = 1;
                toolbar.init = function () {
                    initToolbarModal(tableId, toolbar, columns);
                };
                break;
            case "delete":
                toolbar.id = tableId+'_toolbar_delete';
                content +=      '<div class="btn-group mr-1" role="group">';
                content +=          '<button id="'+toolbar.id+'" type="button" class="btn btn-danger">删除</button>';
                content +=      '</div>';
                toolbar.disableCount = 0;
                toolbar.init = function () {
                    initToolbarDeleteModal(tableId, toolbar);
                };
                break;
            default:
                content +=      '<div class="btn-group mr-1" role="group">';
                content +=          '<button id="'+toolbar.id+'" type="button" class="btn btn-primary">'+toolbar.title+'</button>';
                content +=      '</div>';
                toolbar.init = function () {
                    initToolbarModal(tableId, toolbar, columns);
                };
                break;
        }
    }
    content +=              '</div>';
    $("#"+tableId).before(content);
    opts.toolbar = "#"+tableId+"_toolbar";
    opts.toolbars = toolbars;
    opts.onCheck = function(row){
        tableSelected(opts);
    };
    opts.onUncheck = function(row){
        tableSelected(opts);
    };
    opts.onCheckAll = function(row){
        tableSelected(opts);
    };
    opts.onUncheckAll = function(row){
        tableSelected(opts);
    };
    opts.onLoadSuccess = function(row){
        tableSelected(opts);
    };
    // opts.onLoadError = function(row){
    //     tableSelected(opts);
    // };
    for(let toolbar of toolbars){
        if(toolbar.hasInit !== true){
            toolbar.init();
            toolbar.hasInit = true;
        }
    }
}

/**
 * 初始化新增/修改按钮模态框内容
 * @param btnId 按钮id
 * @param toolbar 按钮传入的配置
 * @param columns 表格中的列
 */
function initToolbarModal(tableId, toolbar, columns) {
    let btnId = toolbar.id;
    let content;
    content =   '<div class="modal fade" id="'+btnId+'_modal" tabindex="-1" role="dialog" aria-labelledby="'+btnId+'_modal_title" data-backdrop="static">';
    content +=      '<div id="'+btnId+'_modal_dialog" class="modal-dialog modal-lg" role="document" aria-hidden="true">';
    content +=          '<div class="modal-content">';

    content +=              '<div class="modal-header">';
    content +=                  '<h5 class="modal-title" id="'+btnId+'_modal_title">';
    content +=                      toolbar.title
    content +=                  '</h5>';
    content +=                  '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
    content +=                      '<span aria-hidden="true">&times;</span>';
    content +=                  '</button>';
    content +=              '</div>';

    content +=              '<div class="modal-body">';
    content +=                  '<form id="'+btnId+'_form" class="form-inline needs-validation" novalidate role="form">';
    if(toolbar.type == "update")
        content +=                  '<input type="hidden" id="'+btnId+'_form_id" name="'+btnId+'_form_id">';
    // if(toolbar.type == "custom")
    //     content +=                  '<div id="' + btnId + '_form_ids_div" class="d-none"></div>';
    content +=                      parseColumns(btnId, columns, toolbar);
    content +=                  '</form>';
    content +=                  generateErrorContent(btnId+"_modal");
    content +=              '</div>';

    content +=              '<div class="modal-footer">';
    content +=                  '<div class="col-md-12">';
    content +=                      '<div class="btn-group col-md-2 offset-md-7" role="group">';
    content +=                          '<button id="'+btnId+'_form_submit" type="button" class="btn btn-primary">提交</button>';
    content +=                      '</div>';
    content +=                      '<div class="btn-group col-md-2 ml-1" role="group">';
    content +=                          '<button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>';
    content +=                      '</div>';
    content +=                  '</div>';
    content +=              '</div>';

    content +=          '</div>';
    content +=      '</div>';
    content +=  '</div>';
    $("body").append(content);

    //模态框初始化日期控件
    initDatetimePicker(btnId+"_modal");

    let form = document.getElementById(btnId+"_form");

    for(let column of columns){
        let $dom = $('[id="'+form.id+"_"+column.field+'"]');
        //级联下拉菜单绑定事件
        if(isString(column.relatedSelect)){
            $('[id="'+form.id+"_"+column.relatedSelect+'"]').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
                // console.log("select "+column.field+" related "+column.relatedSelect+" change: "+$(e.target).val())
                if($(e.target).val() == undefined) {
                    //文本框关联下拉菜单，没有值是设置为空
                    if(column.type == undefined || column.type == "text" || column.type == "textarea"){
                        $dom.val('');
                    }
                    return;
                }

                let relatedDictionary;
                if (column.relatedField != undefined) {
                    for (let relatedColumn of columns) {
                        if (relatedColumn.field == column.relatedSelect) {
                            relatedDictionary = relatedColumn.dictionary;
                            break;
                        }
                    }
                    for (let option of relatedDictionary) {
                        if (option.dictionaryTagKey == $(e.target).val()) {
                            column.dictionaryKey = parseField(option, column.relatedField);
                            break;
                        }
                    }
                } else {
                    column.dictionaryKey = $(e.target).val();
                }
                if(column.type == 'select') {
                    initRelatedSelect($dom, column);
                }else if(column.type == undefined || column.type == "text" || column.type == "textarea"){
                    $dom.val(column.dictionaryKey);
                }
            });
        }
    }

    //按钮点击事件
    $("#"+btnId).click(function () {
        //弹出模态框，初始化页面错误元素
        $("#"+btnId+"_modal").modal('show');
        initErrorContent(btnId+"_modal");

        let promises = new Array();
        for(let column of columns){
            let $dom = $('[id="'+form.id+"_"+column.field+'"]');
            //初始化表单值
            if(isString(column.field) && (toolbar.invisible == undefined
                || $.inArray(column.field, toolbar.invisible) == -1)) {
                //查询下拉菜单选项
                if(column.type == 'select' && column.relatedSelect == undefined){
                    promises.push(promiseAjaxDictionaryTags(column));
                }else{
                    setDomValue($dom);
                }
            }
        }
        $.when.apply(this, promises).then(function () {
            for(let selectColumn of arguments){
                let $dom = $('[id="'+form.id+"_"+selectColumn.field+'"]');
                $dom.html(selectOptions(selectColumn.dictionary));
                setDomValue($dom);
            }
            //点击修改按钮，需要先查询数据
            if(toolbar.type == "update"){
                let ids = tableSelectedIds(tableId);
                $.ajax({
                    url: toolbar.queryUrl,
                    data: {id: ids[0]},
                    success: function (result) {
                        // console.log("query "+this.url);
                        $(form).show();
                        $("#"+btnId+"_form_submit").show();
                        let data = result.data;

                        let $dom = $('#'+form.id+"_id");
                        setDomValue($dom, data.id);

                        for (let column of columns) {
                            //A->B级联下拉菜单，B获取值并设置到列属性，之后在A改变内容时获取
                            if (column.type == 'select' && isString(column.relatedSelect)) {
                                column.selectInitData = parseField(data, column.field);
                            }
                        }
                        //前后遍历不能合并：级联下拉有依赖性
                        for (let column of columns) {
                            if(isString(column.field)){
                                let $dom = $('[id="'+form.id+"_"+column.field+'"]');
                                // if (column.type == 'select') {
                                //     console.log("set "+column.field+": "+parseField(data, column.field))
                                // }
                                setDomValue($dom, parseField(data, column.field));
                            }
                        }
                    },
                    error: function (error) {
                        $(form).hide();
                        $("#"+btnId+"_form_submit").hide();
                        showError(error, btnId+"_modal");
                    }
                });
            }
        });

        //自定义按钮，隐藏域设置为表格多选ids
        // if(toolbar.type == "custom"){
        //     let ids = tableSelectedIds(tableId);
        //     let content = '';
        //     for(let id of ids){
        //         content += '<input type="checkbox" name="'+form.id+"_ids"+'" value="'+id+'" checked>';
        //     }
        //     $("#"+form.id+"_ids_div").html(content);
        // }
    });


    //模态框中提交事件
    $("#"+btnId+"_form_submit").click(function (e) {
        if(validateForm(form, e)){
            let data = $(form).serializeJson(form.id+"_");
            if(toolbar.type == "custom") {
                let ids = tableSelectedIds(tableId);
                if (typeof toolbar.disableCount == "number") {
                    data.ids = ids;
                } else if (toolbar.enableCount == 1) {
                    data.id = ids[0];
                }
            }
            $.ajax({
                type: 'post',
                url: toolbar.url,
                contentType: "application/json",
                //表单中控件id和name为特殊值会有问题，所以统一生成的id都加前缀，提交时获取的name去除前缀
                data: JSON.stringify(data),
                success: function () {
                    $(form).removeClass("was-validated");
                    $("#"+btnId+"_modal").modal('hide');
                    showSuccessModal();
                    $("#"+tableId).bootstrapTable('refresh');
                },
                error: function (error) {
                    $(form).removeClass("was-validated");
                    showError(error, btnId+"_modal");
                }
            });
        }
        return false;
    });
}

/**
 * 初始化级联下拉菜单值
 * @param $dom
 * @param url
 * @param dictionaryKey
 * @param value
 * TODO
 */
function initRelatedSelect($dom, column) {
    //初始化
    if(column.url == undefined) {
        if(column.selectInited != true){
            let tags = column.dictionary;
            let options = selectOptions(tags);
            $dom.html(options);
            column.selectInited = true;
        }
        //设值
        $dom.selectpicker('val', column.dictionaryKey);
    }else {
        let promise = promiseAjaxDictionaryTags(column);
        $.when(promise).done(function () {
            let options = selectOptions(column.dictionary);
            $dom.html(options);
            //设值
            $dom.selectpicker('val', column.selectInitData == undefined ? '' : column.selectInitData);
            $dom.selectpicker('refresh');
            if(column.selectInitData != undefined)
                column.selectInitData = undefined;
        }).fail(function () {
            for(let error of arguments){
                showError(error);
            }
        });
    }
}

/**
 * 表单元素设值
 * @param $dom 表单jQuery对象
 * @param value 要设置的值
 */
function setDomValue($dom, value) {
    if(value == undefined) value = '';
    if ($dom.hasClass("datetimepicker-input") && $dom.val() != value)
        $dom.datetimepicker('date', value);
    else if (($dom.attr("type") == "text" || $dom.is("textarea") || $dom.attr("type") == "hidden") && $dom.val() != value)
        $dom.val(value);
    else if ($dom.attr("type") == "checkbox" && $dom.val() != value){
        $dom.attr("checked", value);
        $dom.val(value);
    }else if($dom.is("select") && $dom.hasClass("selectpicker") && $dom.selectpicker('val') != value){
        // console.log("set select value: "+$dom.attr("id")+"="+$dom.selectpicker('val')+"->"+value)
        $dom.selectpicker('val', value);
        $dom.selectpicker('refresh');
    }
}

/**
 * 新增/修改按钮初始化时，生成按钮点击以后，打开的模态框中表单内容
 * @param btnId 按钮id
 * @param columns 表单中设置的列
 * @param invisible 不包含的列
 * @returns {string} 表单html内容
 */
function parseColumns(btnId, columns, toolbar) {
    let invisible = toolbar.invisible;
    let modalId = btnId+"_modal";
    let formId = btnId+"_form";
    let content = '';
    // 表单每行添加控件时，如果该行有两个控件，需要在该行第一个控件添加开头标签，第二个控件添加结束标签
    let nextNewLine = true;
    for(let column of columns){
        if(isString(column.field) && (invisible == undefined || $.inArray(column.field, invisible) == -1)) {
            let required = (column.required == true || $.inArray(column.field, toolbar.requireFields) != -1);
            let requiredString = (required ? ' required' : '');
            let domId = formId+'_'+column.field;
            let domIdString = ' id='+domId;
            let domName = formId+'_'+(isString(column.submitName) ? column.submitName : column.field);
            let domNameString = (column.noneSubmit == true ? '' : ' name='+domName);
            let domDisabledString = (column.disabled == true ? ' disabled="true"' : '');
            let domReadOnlyString = (column.readonly == true ? ' readonly="readonly"' : '');
            let domString = domIdString + domNameString + domDisabledString + domReadOnlyString + requiredString;
            let domPatternString = (isString(column.pattern) ? ' pattern="'+column.pattern+'"' : '');
            let type = (isString(column.type) ? column.type : "text");
            if(type == "checkbox") {
                content += '<div class="form-group col-md-12 align-items-start mt-3 p-0">';
                content += '<label for="' + formId + '_' + column.field + '" class="col-md-2 p-0" style="display: inline; text-align:right">' + column.title + '：</label>';
                content += '<input type="' + type + '" class="p-0"' + domString + ' value="false" onclick="' + (column.disabled == true ? 'return false;' : 'this.value=this.checked;') + '">';
                content += columnTooltip(column);
                content += '</div>';
            } else if(type == "textarea") {
                content +=          '<div class="form-group col-md-12 align-items-start mt-3 p-0">';
                content +=              '<label for="'+formId+'_'+column.field+'" class="col-md-2 p-0" style="display: inline; text-align:right">'+column.title+'：</label>';
                content +=              '<textarea class="form-control p-0 col-md-8" rows="3"'+domString+'></textarea>';
                content +=              columnTooltip(column);
                content +=          '</div>';
            } else {
                content +=              '<div class="form-group col-md-6 align-items-start mt-3 p-0">';
                content +=                  '<label for="'+formId+'_'+column.field+'" class="col-md-4 p-0 mt-1" style="display: inline; text-align:right">'+(required ? ' <label class="text-danger font-weight-bold mr-1" style="display: inline; text-align:right">*</label>' : '')+column.title+'：</label>';
                if(type == "datetime") {
                    content +=              '<input type="text" class="form-control datetimepicker-input col-md-7"'+domString+' data-toggle="datetimepicker" data-target="#'+domId+'"/>';
                }else if(type == "select"){
                    domString += (column.readonly == true ? ' disabled="true"' : '');
                    content +=              '<select class="selectpicker form-control col-md-7"'+domString+' data-container="#'+modalId+'"'+(column.search == true ? ' data-live-search="true"' : '')+'>';
                    content +=                  selectOptions(column.dictionary);
                    content +=              '</select>';
                }else {

                    content +=              '<input type="'+type+'" class="form-control col-md-7"'+domString+domPatternString+'>';
                }
                content +=                  columnTooltip(column);
                content +=              '</div>';
            }
        }
    }
    return content;
}

function selectOptions(data) {
    let content = '';
    if($.isArray(data)) {
        for (let option of data) {
            if(option != undefined && option.dictionaryTagKey != undefined && option.dictionaryTagValue != undefined)
                content += '<option value="' + option.dictionaryTagKey + '">' + option.dictionaryTagValue + '</option>';
        }
    }
    return content;
}

/**
 * 生成表单元素验证错误提示
 * @param column
 * @returns {string}
 */
function columnTooltip(column) {
    let content = '';
    if(isString(column.tooltip)){
        content +=              '<label class="col-md-4"></label>';
        content +=              '<div class="invalid-feedback col-md-7 p-0">';
        content +=                  column.tooltip;
        content +=              '</div>';
    }
    return content;
}

/**
 * 初始化容器中的日期控件
 * @param containerId 容器id
 */
function initDatetimePicker(containerId) {
    $("#"+containerId+" .datetimepicker-input").each(function () {
        $(this).datetimepicker({
            locale: "zh-cn",
            format: "YYYY-MM-DD HH:mm:ss",
            dayViewHeaderFormat: "YYYY[年]MM[月]",
            extraFormats: false,
            icons: {
                time: 'far fa-clock',
                date: 'fas fa-calendar-alt',
                up: 'fas fa-arrow-up',
                down: 'fas fa-arrow-down',
                previous: 'fas fa-arrow-left',
                next: 'fas fa-arrow-right',
                today: 'fas fa-calendar-check',
                clear: 'fa fa-delete',
                close: 'fa fa-times'
            },
            // tooltip options
            tooltips: {
                today: '切换到今日',
                clear: '清除选择',
                close: '关闭',
                selectMonth: '选择月',
                prevMonth: '上月',
                nextMonth: '下月',
                selectYear: '选择年',
                prevYear: '上年',
                nextYear: '下年',
                selectDecade: 'Select Decade',
                prevDecade: 'Previous Decade',
                nextDecade: 'Next Decade',
                prevCentury: 'Previous Century',
                nextCentury: 'Next Century',
                pickHour: 'Pick Hour',
                incrementHour: '加一小时',
                decrementHour: '减一小时',
                pickMinute: 'Pick Minute',
                incrementMinute: '加一分钟',
                decrementMinute: '减一分钟',
                pickSecond: 'Pick Second',
                incrementSecond: 'Increment Second',
                decrementSecond: 'Decrement Second',
                togglePeriod: 'Toggle Period',
                selectTime: '选择时间',
                selectDate: '选择日期'
            },
            // enable/disable buttons
            buttons: {
                showToday: true,
                showClear: false,
                showClose: true
            },
        });
    });
}

/**
 * 初始化删除按钮点击事件：初始化确认模态框并绑定确认事件
 * @param tableId 表格id
 * @param toolbar 删除按钮配置
 */
function initToolbarDeleteModal(tableId, toolbar) {
    initConfirmModal({
        id: tableId+"_toolbar_delete",
        title: "删除确认",
        body: isString(toolbar.title) ? toolbar.title : "确认要删除选中数据吗？",
        confirm: function () {
            $.ajax({
                url: toolbar.url,
                data: {"ids": tableSelectedIds(tableId)},
                success: function (r) {
                    showSuccessModal();
                    $("#"+tableId).bootstrapTable('refresh');
                },
                error: function (error) {
                    showError(error);
                }
            });
        }
    });
    $("#"+tableId+"_toolbar_delete").click(function () {
        showConfirmModal(tableId+"_toolbar_delete");
    });
}

/**
 * 根据表格选择的数据，禁用/开启修改及删除按钮
 * @param tableId 表格id
 */
function tableSelected(opts) {
    let tableId = opts.id;
    let toolbars = opts.toolbars;
    let selectedRows = $("#"+tableId).bootstrapTable('getAllSelections');
    for(let toolbar of toolbars){
        if(typeof toolbar.enableCount == "number"){
            if(selectedRows.length == toolbar.enableCount)
                $("#"+toolbar.id).attr("disabled", false);
            else
                $("#"+toolbar.id).attr("disabled", true);
        }else if(typeof toolbar.disableCount == "number"){
            if(selectedRows.length == toolbar.disableCount)
                $("#"+toolbar.id).attr("disabled", true);
            else
                $("#"+toolbar.id).attr("disabled", false);
        }
    }
}

/**
 * 获取表格中选中数据行的ids
 * @param tableId 表格id
 * @returns {any[]}
 */
function tableSelectedIds(tableId) {
    let selectedRows = $("#"+tableId).bootstrapTable('getAllSelections');
    let ids = new Array();
    for(let row of selectedRows){
        if(row.id != undefined) {
            ids.push(row.id);
        }
    }
    return ids;
}