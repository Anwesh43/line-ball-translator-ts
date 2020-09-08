const w : number = window.innerWidth 
const h : number = window.innerHeight
const parts : number = 5  
const scGap : number = 0.02 / parts 
const strokeFactor : number = 90 
const delay : number = 20
const rFactor : number = 12.2  
const lineFactor : number = 8 
const colors : Array<string> = ["indigo", "green", "purple", "teal", "#ff5722"]
const backColor : string = "#BDBDBD"

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    } 

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
    }

    static sinify(scale : number) : number {
        return Math.sin(scale * Math.PI)
    }
}

class DrawingUtil {

    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawCircle(context : CanvasRenderingContext2D, x : number, y : number, r : number) {
        context.beginPath()
        context.arc(x, y, r, 0, 2 * Math.PI)
        context.fill()
    }

    static drawLineBallTranslator(context : CanvasRenderingContext2D, scale : number) {
        const sf : number = ScaleUtil.sinify(scale)
        const sf1 : number = ScaleUtil.divideScale(sf, 0, parts)
        const sf2 : number = ScaleUtil.divideScale(sf, 1, parts)
        const sf3 : number = ScaleUtil.divideScale(sf, 2, parts)
        const sf4 : number = ScaleUtil.divideScale(sf, 3, parts)
        const r : number = Math.min(w, h) / rFactor 
        const lineSize : number = Math.min(w, h) / lineFactor 
        context.save()
        context.translate((w - lineSize) * (1 - sf4), h / 2)
        context.save()
        context.translate(-(w - lineSize) * (1 - sf2), 0)
        DrawingUtil.drawLine(context, 0, 0, lineSize * sf1, 0)
        context.restore()
        DrawingUtil.drawCircle(context, -r - (lineSize / 2) * sf3, -r, r * sf1)
        context.restore()
    }

    static drawLBTNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor 
        context.strokeStyle = colors[i]
        context.fillStyle = colors[i]
        DrawingUtil.drawLineBallTranslator(context, scale)
    }
}