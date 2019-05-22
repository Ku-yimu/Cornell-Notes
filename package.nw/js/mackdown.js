init();
function init() {
    /**
     * 初始化
     * 执行需要提前执行的js
     * 设置js文件
     */
    let rendererMD = new marked.Renderer();
    marked.setOptions({
        renderer: rendererMD,
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
    });
    var marked = require('marked');
    var highlight = require('highlight\\highlight.pack.js');
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
            return highlight.highlightAuto(code).value;
        }
    });
    analysis();
}
function analysis() {
    /**
     * 解析js
     */
    reduce_input = document.getElementById('reduce-edit').value;
    document.getElementById('reduce-show').innerHTML = marked(reduce_input);
    record_input = document.getElementById('record-edit').value;
    document.getElementById('record-show').innerHTML = marked(record_input);
    review_input = document.getElementById('review-edit').value;
    document.getElementById('review-show').innerHTML = marked(review_input);
    hljs.initHighlighting();
}

function fileSave() {
    /**
     * 保存文件
     */
    var fs = require("fs");
    fileName = document.getElementById('file-name').value;
    reduceEdit = document.getElementById('reduce-edit').value;
    recordEdit = document.getElementById('record-edit').value;
    reviewEdit = document.getElementById('review-edit').value;
    data = `> Application: Cornell Notes
> Version: 0.1
> By:OnEMUE
> Speaker: Cornell
# Recite&Reduce
` + reduceEdit + `
# Record
` + recordEdit + `
# Reflect&Review
` + reviewEdit; // 文件样式
    // _FILE_PATH = "C:\\Users\\亦木\\Desktop\\";
    fileName = fileName + '.md';
    Path = _FILE_PATH + fileName
    console.log(996)
    fs.writeFile(Path, data, function (err) {
        console.log("文本创建成功");
    });
}

function adjustEdit() {
    rightShow = document.getElementById('right-show');
    leftEdit = document.getElementById('left-edit');
    packShow = document.getElementById('pack-show');
    packEdit = document.getElementById('pack-edit');
    editWidth = leftEdit.style.width;
    showWidth = rightShow.style.width;
    if (editWidth == "0px") {
        leftEdit.style.width = "50%";
        rightShow.style.width = "50%";
        packEdit.innerHTML = "收起编辑区"
        packShow.innerHTML = "收起显示区"
    } else {
        leftEdit.style.width = 0;
        rightShow.style.width = "100%";
        packEdit.innerHTML = "放开编辑区"
        packShow.innerHTML = "收起显示区"
    }

}
function adjustShow() {
    /**
     * 打开关闭显示区
     */
    rightShow = document.getElementById('right-show');
    leftEdit = document.getElementById('left-edit');
    packShow = document.getElementById('pack-show');
    packEdit = document.getElementById('pack-edit');
    editWidth = leftEdit.style.width;
    showWidth = rightShow.style.width;
    if (showWidth == "0px") {
        leftEdit.style.width = "50%";
        rightShow.style.width = "50%";
        packShow.innerHTML = "收起显示区"
        packEdit.innerHTML = "收起编辑区"
    } else {
        leftEdit.style.width = "100%";
        rightShow.style.width = 0;
        packShow.innerHTML = "放开显示区"
        packEdit.innerHTML = "收起编辑区"

    }
}
document.onkeydown = function (e) {
    /**
     * 监听按键
     */
    event = event || window.event;
    var currKey = 0, e = e || event || window.event;
    currKey = e.keyCode || e.which || e.charCode;
    //检测按下哪个键，作相应处理
    if ((e.ctrlKey || e.metaKey)) {
        switch (currKey) {

            case 83:

                console.log("ctrl+s");
                fileSave();

                break;

            case 82:
                console.log("ctrl+w");

                adjustEdit();

                break;

            case 87:
                console.log("ctrl+r");

                adjustShow();

                break;

            default:

                return false;

        }

        return false;
    } else {
        return true;
    }
}
function isSupportFileApi() {
    if(window.File && window.FileList && window.FileReader && window.Blob) {
        return true;
    }
    return false;
}
// js
//
//
$(document).ready(function() {
    $("#text").click(function() {
        // 动画效果
        $("#header-slide").slideToggle("slow");
    });
    $("#text").click(function() {
        // 动画效果
        $("#header-slide").fadeToggle("slow");
    });
});
$("#text").click(function() {
    // 动画效果
    $("#header-slide").slideToggle("slow");
});
function handleFiles(files) {
    if (files.length) {
        var file = files[0];
        var reader = new FileReader();
        if (/text\/\w+/.test(file.type)) {
            reader.onload = function () {
                $('<pre>' + this.result + '</pre>').appendTo('body');
            }
            reader.readAsText(file);
        }
    }
}


function fakeClick(obj) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    obj.dispatchEvent(ev);
}

function exportRaw(name, data) {
    var urlObject = window.URL || window.webkitURL || window;
    var export_blob = new Blob([data]);
    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name;
    fakeClick(save_link);
}
var openFile = function (event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function () {
        if (reader.result) {
            //显示文件内容
            var text = reader.result
            var regex = /\# Record&Reduce(.+?)\# Record/g;
            var result;
            console.log(result = regex.exec(text))
            while ((result = regex.exec(text)) != null) {
                console.log(result[1]);
                console.log(reader.result);
            }
            var reduce_input = reader.result.match(/Reduce(\S*)Record/);

            $("#file_name").html(reader.result);
            $("#reduce_input").html(reader.result);
            $("#record_input").html(reduce_input);
            $("#review_input").html(reader.result);
            init();
        }
    };
    reader.readAsText(input.files[0]);
    var dashboard = document.getElementById("dashboard")
		dashboard.addEventListener("dragover", function (e) {
			e.preventDefault()
			e.stopPropagation()
		})
		dashboard.addEventListener("dragenter", function (e) {
			e.preventDefault()
			e.stopPropagation()
		})
		dashboard.addEventListener("drop", function (e) {
			// 必须要禁用浏览器默认事件
			e.preventDefault()
			e.stopPropagation()
			var files = this.files || e.dataTransfer.files
			var reader = new FileReader()
			reader.readAsText(files[0], 'utf-8')
			reader.onload = function (evt) {
				var text = evt.target.result
				dashboard.innerText = text
			}
		})
    init();
};

//字符串截取
str.trim().split('\n').forEach(function(v, i) {
    window['str' + (i+1)] = v
  })

