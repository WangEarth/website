var box = document.getElementById("box");
var ball = document.getElementById("ball");
var btn = document.getElementById("btn");
var slider = document.getElementById("slider")
var obrick = document.getElementById("brick")
var brickArr = obrick.getElementsByTagName("div")
var grade = document.getElementById("grade")
var rank = grade.children[1]
var score = grade.children[3]
var sco = 0;
var timer;
var isRunning = false;
var speedX = rand(3, 12);
var speedY = -rand(3, 12);
var num = speedX - speedY;
console.log(num)
switch (num) {
  case 6:
  case 7:
  case 8:
    rank.innerHTML = "简单";
    break;
  case 9:
  case 10:
  case 11:
    rank.innerHTML = "一般";
    break;
  case 12:
  case 13:
  case 14:
    rank.innerHTML = "中等";
    break;
  case 15:
  case 16:
  case 17:
    rank.innerHTML = "难"
    break;
  case 18:
  case 19:
  case 20:
    rank.innerHTML = "很难"
    slider.style.width = 100 + "px";
    break;
  case 21:
  case 22:
    rank.innerHTML = "特别难"
    slider.style.width = 80 + "px";
    break;
  case 23:
  case 24:
    rank.innerHTML = "哭了"
    slider.style.width = 60 + "px";
    break;
}

//随机生成小球与滑块位置
var beginGo = rand(100, 500)
ball.style.left = beginGo + 40 + "px"
slider.style.left = beginGo + "px"

//开始按钮点击事件
btn.onclick = function() {
  btn.style.display = "none";
  isRunning = true;
  clearInterval(timer);
  timer = setInterval(function() {
    //获取小球初始位置
    var ballLeft = ball.offsetLeft;
    var ballTop = ball.offsetTop;

    //获取小球运动之后位置
    var nextleft = ballLeft + speedX;
    var nexttop = ballTop + speedY;

    //水平边界判断，当小球的left值小于容器左边界或者大于容器右边界时，将水平方向速度取反
    if (nextleft <= 0 || nextleft >= box.offsetWidth - ball.offsetWidth - 10) {
      speedX = -speedX;
    }
    //垂直边界判断，当小球的top值小于容器上边界时，将垂直方向速度取反
    if (nexttop <= 0) {
      speedY = -speedY;
    }
    //当小球触碰到下边界时，提示“游戏失败”，重新刷新页面
    if (nexttop > box.offsetHeight - ball.offsetHeight) {
      location.reload()
    }

    //将运动后的位置重新赋值给小球
    ball.style.left = nextleft + "px";
    ball.style.top = nexttop + "px";

    //小球与滑块的碰撞检测
    if (knock(ball, slider)) {
      speedY = -speedY;
    }

    //小球与方块的碰撞检测
    for (var j = 0; j < brickArr.length; j++) {
      if (knock(brickArr[j], ball)) {
        speedY = -speedY
        obrick.removeChild(brickArr[j]);
        sco++;
        score.innerHTML = sco;
        break;
      }
    }

    //当容器中方块数量为0时，宣布“游戏胜利”，刷新页面
    if (brickArr.length <= 0) {
      location.reload();
    }
  }, 20)
}

//鼠标控制滑块
slider.onmousedown = function(e) {
  var e = e || window.event;
  //获取滑块初始位置
  var offsetX = e.clientX - slider.offsetLeft;
  if (isRunning) {
    document.onmousemove = function(e) {
      var e = e || window.event;
      var l = e.clientX - offsetX;
      if (l <= 0) {
        l = 0;
      }
      if (l >= box.offsetWidth - slider.offsetWidth - 10) {
        l = box.offsetWidth - slider.offsetWidth - 10;
      }
      slider.style.left = l + "px";
    }
  }
}
document.onmouseup = function() {
  document.onmousemove = null;
}

//按键控制滑块
document.onkeydown = function(e) {
  var e = e || window.event;
  var code = e.keyCode || e.which;
  var offsetX = slider.offsetLeft;
  if (isRunning) {
    switch (code) {
      case 37:
        if (offsetX <= 0) {
          slider.style.left = 0
          break;
        }
        slider.style.left = offsetX * 4 / 5 + "px";
        break;
      case 39:
        if (offsetX >= box.offsetWidth - slider.offsetWidth - 10) {
          slider.style.left = box.offsetWidth - slider.offsetWidth;
          break;
        }
        slider.style.left = (box.offsetWidth - slider.offsetWidth - offsetX) / 5 + offsetX + "px";
        break;
    }
  }

}


createBrick(72)

//容器内创建方块
function createBrick(n) {
  var oBrick = document.getElementById("brick")
  //在大盒子brick中插入n个div方块，并给予随机颜色
  for (var i = 0; i < n; i++) {
    var node = document.createElement("div");
    node.style.backgroundColor = color();
    oBrick.appendChild(node);
  }
  //获取所有的方块
  var brickArr = obrick.getElementsByTagName("div")
  //根据每个方块当前所在位置，将left与top值赋给方块
  for (var i = 0; i < brickArr.length; i++) {
    brickArr[i].style.left = brickArr[i].offsetLeft + "px";
    brickArr[i].style.top = brickArr[i].offsetTop + "px";
  }
  //将所有方块设置成绝对定位，注意这一步与上一步顺序不能调换
  for (var i = 0; i < brickArr.length; i++) {
    brickArr[i].style.position = "absolute";
  }
}

//随机生成颜色
function color() {
  var result = "#";
  for (var i = 0; i < 6; i++) {
    result += rand(0, 15).toString(16)
    // 把十进制的数字变成十六进制的字符串:0 1 ...9 a b c d f
  }
  return result;
}
//随机数生成
function rand(n, m) {
  return n + parseInt(Math.random() * (m - n + 1));
}
//碰撞检测函数
function knock(node1, node2) {
  var l1 = node1.offsetLeft;
  var r1 = node1.offsetLeft + node1.offsetWidth;
  var t1 = node1.offsetTop;
  var b1 = node1.offsetTop + node1.offsetHeight;
  var l2 = node2.offsetLeft;
  var r2 = node2.offsetLeft + node2.offsetWidth;
  var t2 = node2.offsetTop;
  var b2 = node2.offsetTop + node2.offsetHeight;
  if (l2 > r1 || r2 < l1 || t2 > b1 || b2 < t1) {
    return false;
  } else {
    return true;
  }
}
