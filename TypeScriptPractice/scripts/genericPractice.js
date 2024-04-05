// 타입을 파라미터로 입력하는 Generic
function counter(data) {
    console.log(data.length);
}
counter("hello");
counter(["kim", "park"]);
var data = '{"name" : "dog", "age" : 1 }';
function jsonToObject(obj) {
    return JSON.parse(obj);
}
console.log(jsonToObject(data));
// 3
var Person = /** @class */ (function () {
    function Person(a) {
        this.name = a;
    }
    return Person;
}());
var a = new Person("어쩌구");
a.name; //any 타입이 되었넹
