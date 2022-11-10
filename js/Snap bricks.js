function createBrick(n) {
  for (var r, i, u = document.getElementById("brick"), t = 0; t < n; t++) r = document.createElement("div"), r.style
    .backgroundColor = color(), u.appendChild(r);
  for (i = obrick.getElementsByTagName("div"), t = 0; t < i.length; t++) i[t].style.left = i[t].offsetLeft + "px", i[t]
    .style.top = i[t].offsetTop + "px";
  for (t = 0; t < i.length; t++) i[t].style.position = "absolute"
}

function color() {
  for (var n = "#", t = 0; t < 6; t++) n += rand(0, 15).toString(16);
  return n
}

function rand(n, t) {
  return n + parseInt(Math.random() * (t - n + 1))
}

function knock(n, t) {
  var i = n.offsetLeft,
    r = n.offsetLeft + n.offsetWidth,
    u = n.offsetTop,
    f = n.offsetTop + n.offsetHeight,
    e = t.offsetLeft,
    o = t.offsetLeft + t.offsetWidth,
    s = t.offsetTop,
    h = t.offsetTop + t.offsetHeight;
  return e > r || o < i || s > f || h < u ? !1 : !0
}
var box = document.getElementById("box"),
  ball = document.getElementById("ball"),
  btn = document.getElementById("btn"),
  slider = document.getElementById("slider"),
  obrick = document.getElementById("brick"),
  brickArr = obrick.getElementsByTagName("div"),
  grade = document.getElementById("grade"),
  rank = grade.children[1],
  score = grade.children[3],
  sco = 0,
  timer, isRunning = !1,
  speedX = rand(3, 12),
  speedY = -rand(3, 12),
  num = speedX - speedY,
  beginGo;
console.log(num);
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
    rank.innerHTML = "难";
    break;
  case 18:
  case 19:
  case 20:
    rank.innerHTML = "很难";
    slider.style.width = "100px";
    break;
  case 21:
  case 22:
    rank.innerHTML = "特别难";
    slider.style.width = "80px";
    break;
  case 23:
  case 24:
    rank.innerHTML = "哭了";
    slider.style.width = "60px"
}
beginGo = rand(100, 500);
ball.style.left = beginGo + 40 + "px";
slider.style.left = beginGo + "px";
btn.onclick = function() {
  btn.style.display = "none";
  isRunning = !0;
  clearInterval(timer);
  timer = setInterval(function() {
    var r = ball.offsetLeft,
      u = ball.offsetTop,
      t = r + speedX,
      i = u + speedY,
      n;
    for ((t <= 0 || t >= box.offsetWidth - ball.offsetWidth - 10) && (speedX = -speedX), i <= 0 && (speedY = -
        speedY), i > box.offsetHeight - ball.offsetHeight && location.reload(), ball.style.left = t + "px", ball
      .style.top = i + "px", knock(ball, slider) && (speedY = -speedY), n = 0; n < brickArr.length; n++)
      if (knock(brickArr[n], ball)) {
        speedY = -speedY;
        obrick.removeChild(brickArr[n]);
        sco++;
        score.innerHTML = sco;
        break
      } brickArr.length <= 0 && location.reload()
  }, 20)
};
slider.onmousedown = function(n) {
  var n = n || window.event,
    t = n.clientX - slider.offsetLeft;
  isRunning && (document.onmousemove = function(n) {
    var n = n || window.event,
      i = n.clientX - t;
    i <= 0 && (i = 0);
    i >= box.offsetWidth - slider.offsetWidth - 10 && (i = box.offsetWidth - slider.offsetWidth - 10);
    slider.style.left = i + "px"
  })
};
document.onmouseup = function() {
  document.onmousemove = null
};
document.onkeydown = function(n) {
  var n = n || window.event,
    i = n.keyCode || n.which,
    t = slider.offsetLeft;
  if (isRunning) switch (i) {
    case 37:
      if (t <= 0) {
        slider.style.left = 0;
        break
      }
      slider.style.left = t * 4 / 5 + "px";
      break;
    case 39:
      if (t >= box.offsetWidth - slider.offsetWidth - 10) {
        slider.style.left = box.offsetWidth - slider.offsetWidth;
        break
      }
      slider.style.left = (box.offsetWidth - slider.offsetWidth - t) / 5 + t + "px"
  }
};
createBrick(72);
