let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

autoSetCanvasSize(canvas)
listenOnUser(canvas)
let eraserEnable = false
eraser.onclick = (e) => {
    eraserEnable = true
    eraser.classList.add('active')
    pen.classList.remove('active')
   
}

clear.onclick = ()=>{  //清屏
    ctx.clearRect(0,0,canvas.width,canvas.height)
}

pen.onclick = (e) => {
    eraserEnable = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}


red.onclick = ()=>{
    ctx.fillStyle = 'red'
    ctx.strokeStyle = 'red'
    red.classList.add('active')
    green.classList.remove('active')
    pink.classList.remove('active')
    black.classList.remove('active')
    blue.classList.remove('active')
}

green.onclick = ()=>{
    ctx.fillStyle = 'green'
    ctx.strokeStyle = 'green'
    green.classList.add('active')
    red.classList.remove('active')
    pink.classList.remove('active')
    black.classList.remove('active')
    blue.classList.remove('active')
}

pink.onclick = ()=>{
    ctx.fillStyle = 'pink'
    ctx.strokeStyle = 'pink'
    pink.classList.add('active')
    green.classList.remove('active')
    red.classList.remove('active')
    black.classList.remove('active')
    blue.classList.remove('active')
}

black.onclick = ()=>{
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'black'
    black.classList.add('active')
    green.classList.remove('active')
    pink.classList.remove('active')
    red.classList.remove('active')
    blue.classList.remove('active')
}

blue.onclick = ()=>{
    ctx.fillStyle = 'blue'
    ctx.strokeStyle = 'blue'
    blue.classList.add('active')
    green.classList.remove('active')
    pink.classList.remove('active')
    black.classList.remove('active')
    red.classList.remove('active')
}








/********下面不用看********/

function listenOnUser(canvas) {
    let using = false
    var lastPoint = { x: undefined, y: undefined }
    //特性检查
    if (document.body.ontouchstart !== undefined) {
        canvas.ontouchstart = (e) => {
            let x = e.touches[0].clientX
            let y = e.touches[0].clientY
            using = true
            if (eraserEnable) {
                ctx.clearRect(x - 7.5, y - 7.5, 15, 15)
            } else {
                lastPoint = { x: x, y: y }
            }
        }
        canvas.ontouchmove = (e) => {
            let x = e.touches[0].clientX
            let y = e.touches[0].clientY
            if (!using) {
                return
            }
            if (eraserEnable) {
                ctx.clearRect(x - 7.5, y - 7.5, 20, 20)
            } else {
                let newPoint = { x: x, y: y }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.ontouchend = (e) => {
            using = false
        }

    } else {
        canvas.onmousedown = (e) => {
            let x = e.clientX
            let y = e.clientY
            using = true
            if (eraserEnable) {
                ctx.clearRect(x - 7.5, y - 7.5, 15, 15)
            } else {
                lastPoint = { x: x, y: y }
            }
        }

        canvas.onmousemove = (e) => {
            let x = e.clientX
            let y = e.clientY
            if (!using) {
                return
            }
            if (eraserEnable) {
                ctx.clearRect(x - 7.5, y - 7.5, 15, 15)
            } else {
                let newPoint = { x: x, y: y }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.onmouseup = (e) => {
            using = false
        }
    }
}

function autoSetCanvasSize(canvas) {
    setCanvasSize()
    window.onresize = (e) => {  //监听用户拉伸高宽
        setCanvasSize()
    }
    function setCanvasSize() {
        let pageWidth = document.documentElement.clientWidth
        let pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

function drawLine(x1, y1, x2, y2) { //画线
    ctx.beginPath()
    ctx.lineTo(x1, y1);
    ctx.lineWidth = 3
    ctx.lineTo(x2, y2);
    ctx.stroke()
}