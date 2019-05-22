/**
 * 修改载入主题
 */
init();
function init() {
    themeInit(); // 初始化主题
    // fileInit(); // 初始化设置
    console.log("初始化完成");
}
function themeInit() {
    /**
     * 调用主题文件
     */
    var oHead = document.getElementsByTagName('HEAD').item(0);
    var oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src = _THEME_PATH;
    oHead.appendChild(oScript);
    console.log("主题调用成功");
}

function fileInit() {
    var fs = require("fs");
    console.log("实例化文件系统完成");
}
function themeAnalysis() {
    document.getElementById('header').style.background = top_background_color;
    document.getElementById('header').style.color = top_font_color;
    document.getElementById('reduce-left').style.background = main_input_background_color;
    document.getElementById('reduce-left').style.color = main_input_font_color;
    document.getElementById('record-left').style.background = side_input_background_color;
    document.getElementById('record-left').style.color = side_input_font_color;
    document.getElementById('review-left').style.background = bottom_input_background_color;
    document.getElementById('review-left').style.color = bottom_input_font_color;
    document.getElementById('reduce-right').style.background = main_input_background_color;
    document.getElementById('reduce-right').style.color = main_input_font_color;
    document.getElementById('record-right').style.background = side_input_background_color;
    document.getElementById('record-right').style.color = side_input_font_color;
    document.getElementById('review-right').style.background = bottom_input_background_color;
    document.getElementById('review-right').style.color = bottom_input_font_color;
    document.getElementsByClassName('header-button').style.background = top_button_background_color;
    document.getElementsByClassName('header-button').style.color = top_button_font_color;
    console.log('主题加载完毕');
}