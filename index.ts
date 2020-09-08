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