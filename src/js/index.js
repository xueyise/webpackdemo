'use strict'
var $ = require("jquery");
var common = require("src/js/common/common");
//require("src/assets/js/jquery.cookie");
var osgmian = require("common/osgmain");

function mainindex() {
    // var username = $.cookie("username");
    // if (username === undefined) {
    //     //window.location.href = "/login.html";
    //     console.log(username);
    //     return;
    // }
    // return common.getHost();
    osgmian.initosg('View');
}


function getpositon() {
    var posti = osgmian.getcurrentpositon();
    $("#statsid").val(posti);
}

$(function () {
    // 显示隐藏用户信息
    $("#user-prof").click(function () {
        $(".menu-toggle").toggleClass("hide");
    });
    //显示隐藏底部导航栏
    $("#panel-controller").click(function () {
        $(".panel-toggle").toggleClass("hide");
        if (!$(".menu-toggle").hasClass("hide")) {
            $(".menu-toggle").addClass("hide");
        }
        if (!$("#sidebar-content").hasClass("hide")) {
            $("#sidebar-content").addClass("hide");
        }
    });
    //显示隐藏侧边栏
    $(".side-bar-tab .tab-title").click(function (e) {
        $("#sidebar-content").toggleClass("hide");
        var index = $(this).data("index");
        if (!$('.side-bar-tab .tab-panel[data-index="' + index + '"]').is(":hidden")) {
            e.cancelBubble;
        }
        $('.side-bar-tab .tab-title:not([data-index="' + index + '"])').removeClass('select');
        $('.side-bar-tab .main-content:not([data-index="' + index + '"])').addClass('hide');
        $('.side-bar-tab .main-content[data-index="' + index + '"]').removeClass('hide');
        $('.side-bar-tab .tab-title[data-index="' + index + '"]').addClass('select');
        $('.side-bar-tab .top-bar .toptab-name').text($('.side-bar-tab .tab-title[data-index="' + index + '"]').text());
        e.cancelBubble;
    });
});
function confirmFuncallback() {
    alert("确认回调函数！！！");
}
function inithtmlfun() {
    $("#markerName").val("4444444444");
}
function openstaticmodeldlg() {
    common.donomodel("31", "测试", 300, 390, "static/html/test.html", confirmFuncallback, inithtmlfun, true,function callback() {
        alert("关闭回调函数！！！");
    },false,false);
}

exports.openstaticmodeldlg = openstaticmodeldlg;
exports.mainindex = mainindex;
exports.getpositon = getpositon;


