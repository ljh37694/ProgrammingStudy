// 타입도 import export 해서 씁니다 그리고 namespace

// 1
type Car = {
    wheel : number,
    model : string
};

interface Bike {
    wheel : 2,
    model : string
};

export { Car, Bike };

// 2
export type FunctionType1 = (obj? : {}) => void;

// 3
namespace A {
    export type Dog = string;
}

namespace B {
    export interface Dog { name : string };
}

let dog1 : A.Dog = 'bark';
let dog2 : B.Dog = { name : 'paw' };