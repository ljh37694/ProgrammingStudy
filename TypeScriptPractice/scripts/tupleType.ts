// array 자료에 붙일 수 있는 tuple type

// 1
let arr: [string, number, boolean] = ["닭봉", 10000, true];

// 2
let arr1: [string, number, ...boolean[]] = ['동서녹차', 4000, true, false, true, true, false, true];

// 3
function func(...args : [string, boolean, (number | string[])]): void {
    console.log(args);
}

// 4
function classification(...args: (string | number)[]): [string[], number[]] {
    let stringArr: string[] = [], numberArr: number[] = [];

    args.forEach((item) => {
        if (typeof item === "string") {
            stringArr.push(item);
        } else {
            numberArr.push(item);
        }
    });

    return [stringArr, numberArr];
}