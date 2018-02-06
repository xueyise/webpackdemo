'use strict'
var $ = require("jquery");
var common = require("src/js/common/common");
//require("src/assets/js/jquery.cookie");
var osgmian = require("osg/osgmain");

var sidebar = require("common/side-bar-tabs");
function mainindex() {
    // var username = $.cookie("username");
    // if (username === undefined) {
    //     //window.location.href = "/login.html";
    //     console.log(username);
    //     return;
    // }
    // return common.getHost();


    sidebar.initSidebar();
    console.log("3");
    osgmian.initosg('View');

}

function getpositon() {
    var posti = osgmian.getcurrentpositon();
    $("#statsid").val(posti);
}

$(function () {
    // 显示隐藏用户信息
    $("#user-prof").click(function (e) {
        if($(".menu-toggle").hasClass("hide")){
            $(".menu-toggle").show();
            $(".menu-toggle").removeClass("hide");
        }else {
            $(".menu-toggle").hide();
            $(".menu-toggle").addClass("hide");
        }
    });
    //自动缩回不在点击区域内的显示的栏目
    $(document).bind("click", function (evt) {
        if (!$('.menu-toggle').data('show') &&
            $(evt.target).parents("#user-prof").length === 0) {
            $('.menu-toggle').hide();
        }
    });
    
    //点击复选框
    // $("checkbox-content").click(function () {
    //     if($(".checkbox-content").hasClass("open")){
    //         $(".checkbox-content").removeClass("open");
    //         $(".checkbox1").removeClass("open1");
    //         $(".checkbox2").removeClass("open2");
    //     }else {
    //         $(".checkbox-content").addClass("open");
    //         $(".checkbox1").addClass("open1");
    //         $(".checkbox2").addClass("open2");
    //     }
    // })

});

function confirmFuncallback() {
    alert("确认回调函数！！！");
}
function inithtmlfun() {
    $("#markerName").val("4444444444");
}
function openstaticmodeldlg() {
    common.donomodel("31", "测试", 300, 390, "static/html/test.html", confirmFuncallback, inithtmlfun, false,function callback() {
        alert("关闭回调函数！！！");
    },false,false);
}

exports.openstaticmodeldlg = openstaticmodeldlg;
exports.mainindex = mainindex;
exports.getpositon = getpositon;


