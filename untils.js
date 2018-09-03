//常用代码片段

//是否是手机设备
function isMobile() {
    var check = false;
    (function (a) {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            check = true;
        }

    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

//获取url里的参数
function request (name) {
    var search = window.location.href.split('#')[1];
    if(search){
        var sValue = search.match(new RegExp("[\?\&]" + name + "=([^\&]*)(\&?)", "i"));
        return sValue ? sValue[1] : sValue;
    }

}


//上传图片并预览
var fileList

    function imgChange(obj1, obj2) {
        //获取点击的文本框
        var file = document.getElementById("file");
        //存放图片的父级元素
        var imgContainer = document.getElementsByClassName(obj1)[0];
        //获取的图片文件
        fileList = file.files;

        var imgArr = [];
        //遍历获取到得图片文件
        for (var i = 0; i < fileList.length; i++) {
            var imgUrl = window.URL.createObjectURL(fileList[i]);
            imgArr.push(imgUrl);
            var img = document.createElement("img");
            img.setAttribute("src", imgArr[i]);
            var tip =  document.createElement("p");
            var tip1 =  document.createElement("i");
            tip1.style.color = 'green';
            tip1.style.margin = '0 auto';
            tip1.style.display='none';
            tip1.setAttribute("class", "glyphicon glyphicon-ok-sign ok");

            var tip2 =  document.createElement("i");
            tip2.setAttribute("class", "glyphicon glyphicon-remove fail");
            tip2.style.color = 'red';
            tip2.style.margin = '0 auto';
            tip2.style.display='none';

            var imgAdd = document.createElement("div");
            imgAdd.setAttribute("class", "z_addImg");
            imgAdd.appendChild(img);
            tip.appendChild(tip1);
            tip.appendChild(tip2);
            imgAdd.appendChild(tip);
            imgContainer.appendChild(imgAdd);


        }
     
    }
