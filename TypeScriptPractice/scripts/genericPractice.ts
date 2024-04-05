// 타입을 파라미터로 입력하는 Generic

function counter<T extends string | string[]>(data: T) {
    console.log(data.length);
}

counter<string>("hello");
counter<string[]>(["kim", "park"]);

interface AnimalType {
    name: string;
    age: number;
}

let data = '{"name" : "dog", "age" : 1 }';

function jsonToObject<T>(obj: string): T {
    return JSON.parse(obj);
}

console.log(jsonToObject<AnimalType>(data));

// 3
class Person<T> {
    name: T;
    constructor(a: T) {
        this.name = a;
    }
}
let a = new Person<string>("어쩌구");
a.name; //any 타입이 되었넹
