// array 자료에 붙일 수 있는 tuple type
// 1
var arr = ["닭봉", 10000, true];
// 2
var arr1 = ['동서녹차', 4000, true, false, true, true, false, true];
// 3
function func() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.log(args);
}
// 4
function classification() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var stringArr = [], numberArr = [];
    args.forEach(function (item) {
        if (typeof item === "string") {
            stringArr.push(item);
        }
        else {
            numberArr.push(item);
        }
    });
    return [stringArr, numberArr];
}
