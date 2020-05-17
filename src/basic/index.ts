// this is basic ts types

let a:boolean = true

let b:number = 1

let c:string = 'ccc'

let d:any[] = [a,b,c]

// 元组类型, 跟数组有差异
let e:[number, string] = [b, c]

enum f {
  name,
  age,
  gender
}

const g: () => void = function() {
  console.log('gg')
}

let n:null = null

let u:undefined = undefined
// 如果没有开启`strict`, 可以相互赋值
// u = n
// n = u

// never
const errorFunc = (message: string):never => {
  throw Error(message)
}
const infiniteFunc = ():never => {
  while(true){}
}
// 是任意类型的子类型, 没有任何子类型
let nv = errorFunc('abc')
let inf = infiniteFunc()
n = nv
u = nv
a = nv
nv = inf
// vn = n 报错

let person:object = {name: 'lorry'}

// 类型断言
const getLength = (target: string|number):number => {
  if((<string>target).length !== undefined) { // 以后会说到自定义类型保护, 在jsx中不可使用<>进行断言, 会跟标签冲突
    return (target as string).length
  } else {
    return target.toString().length
  }
}
