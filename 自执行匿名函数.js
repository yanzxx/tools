//1、函数声明 和 函数表达式

//函数声明 函数声明存在函数声明提升 ，在调用之前先读取函数声明，所以调用的语句写在声明前后都可执行
function sum(x,y){
	console.log(x+y);
}
sum(1,2);

//函数表达式 函数表式不存在函数声明提升，必须先声明再调用
var a=function(x){
	console.log(x);
}
a(2);


//2、匿名函数调用
//正确声明方式
(function(){

})();

var foo = function(x){
	console.log(x);
}(1);


//错误的几种形式
function (){}();// 等价于  function(){};();会报错 因为function 需要名字

function foo(){}();//()在这里是分组操作符，不是函数调用，需要包含表达式

function foo(){}(1);//这样写不会报错但是不会调用函数，等同于 function foo(){};(1);

//应用
for(var i=0;i<5;i++){
	(function(j){
		setTimeout(function(){console.log(j)}, j*1000);
	})(i)
}


//3、自执行函数 我们创建一个匿名函数，并立即执行，由于外部无法引用它内部的变量，因此在执行完之后很快被释放，并且不会污染全局。
(function(){}())//推荐
(function(){})()

// 
var i = function () { console.log('1');} ();
true && function () { console.log('2'); } ();
0, function () { console.log('3');} ();


