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

pen.onclick = (e) => {
    eraserEnable = false
 

    pen.classList.add('active')
    eraser.classList.remove('active')
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
                ctx.clearRect(x - 7.5, y - 7.5, 15, 15)
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