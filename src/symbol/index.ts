/**
 * symbol ES6新增特性
 * 1. 基本数据类型
 * 2. 用于表示独一无二的
 * 3. 无法使用new运算符
 */

const a = Symbol()
const b = Symbol()
// console.log(a === b) false
const c = Symbol('lorry')
const d = Symbol('lorry')
// console.log(c === d) false


// 不支持传输对象, 浏览器会隐式转换为字符串, 即[object object]
// const e = Symbol({name: 'lorry'})

// Symbol 的隐式转换
Boolean(a) // true
String(a) // Symbol()

// 作为属性名, 不会出现重复定义属性的问题
const obj = {
  [a]: 'lorry',
  age:18
}
// 只可通过中括号进行访问, 不可以通过obj.a访问
obj[a] // lorry

// for in, Object.keys(), getOwnPropertyNames()不会遍历symbol值, 哪怕手动设置enumerable为true也不行
for(const key in obj) {
  console.log(key) // 只会打印age
}
Object.keys(obj)
Object.getOwnPropertyNames(obj)
// 以下两种方法可以访问到
Object.getOwnPropertySymbols(obj)
Reflect.ownKeys(obj)

// symbol和symbol.for的区别
// Symbol.for 会在全局变量中去搜索值, 包括当前window, iframe, service-worker, 如果有, 直接返回, 如果没有, 新建一个
const aa = Symbol.for('aa')
const cc = Symbol.for('aa')
// aa === cc // true
Symbol.keyFor(aa) // aa

// 内置的symbol值
// 1. Symbol.hasInstance, instanceof方法时调用
const obj1 = {
  [Symbol.hasInstance](otherObj) {
    console.log(otherObj)
    // 返回值用于判断instanceof的返回值
    return true
  }
}

;({a: 'a'}) instanceof <any>obj1

// 2. Symbol.isConcatSpreadable 数组是否可以被concat展开, 默认为undefined, 与设置为true一样
const arr = [1,2]
arr[Symbol.isConcatSpreadable] = false
console.log([3,4].concat(arr)) // [3, 4, Array(2)]

// 判断衍生对象的种类
class A extends Array {
  constructor(...args) {
    super(...args)
  }
  static get [Symbol.species]() {
    return Array
  }
}
const a1 = new A([1,2,3])
const a11 = a1.map(num => num +1)
console.log(a1 instanceof A) // true
console.log(a11 instanceof A) // false
console.log(a11 instanceof Array) // true

const obj2 = {
  [Symbol.match](s: string) {
    console.log(s.length)
  },
  [Symbol.split](s: string) {
    console.log('split')
  },
  [Symbol.replace](s: string, replace: string) {
    console.log(`replace from ${s} to ${replace}`)
  },
  [Symbol.search](s: string) {
    console.log(`search ${s}`)
  }
}
'aaa'.match(<any>obj2) // 3
'bbb'.split(<any>obj2) // split
'ccc'.replace(<any>obj2, 'a') // replace from ccc to a
'ddd'.search(<any>obj2) // search ddd

// 默认遍历器方法 Symbol.iterator

const arr2 = [1,2,3]
const iterator = arr2[Symbol.iterator]()
let done = false
while(!done) {
  const next = iterator.next()
  done = next.done
  console.log(next.value) // 1 2 3
}

let obj3:unknown = {
  [Symbol.toPrimitive](type) {
    console.log(type)
  }
}
// 记得不能同时使用, 因为转换一次之后就没有.toPrimitive这个方法了
// ;(obj3 as number)++ // number
// const res = `abc${obj3}` // string

let obj4 = {
  [Symbol.toStringTag]: 'lorry'
}
console.log(obj4.toString()) // [object lorry]

// Symbol.unscopables 获取不能在with中使用的属性和方法
// 严格模式无法使用
console.log(Array.prototype[Symbol.unscopables])
// copyWithin: true
// entries: true
// fill: true
// find: true
// findIndex: true
// flat: true
// flatMap: true
// includes: true
// keys: true
// values: true
// with (Array) {
//   console.log(copyWithing) // Uncaught ReferenceError: copyWithing is not defined
// }

export {}
