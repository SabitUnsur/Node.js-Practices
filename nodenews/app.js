console.log("değişti")
console.log("değişti2")
console.log("Merhaba Dünya")

const array=[
    {
        value:1
    },
    {
        value:2
    },
    {
        value:3
    },
    {
        value:4
    }
]


console.log(array.findLast(x=>x.value%2===1))

console.log(array.findLastIndex(x=>x.value%2==1))

console.log(array.findLastIndex(x=>x.value==100))


fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))


const test=require('node:test')
const assert=require('node:assert')

test('Benim Testim',async(t)=>{
    await t.test("Sayıları Toplamı Birbirine Eşittir",()=>{
        assert.equal(4,4)
    })
  
})


test('Benim Testim 2',async(t)=>{
    await t.test("Sayıları Toplamı Birbirine Eşit Değildir",()=>{
        assert.notEqual(4,4)
    })
  
})

