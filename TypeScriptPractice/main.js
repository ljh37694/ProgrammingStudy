function PrimitiveType() {
    var name = "Lee";
    var age = 23;
    var birthLocation = "경기도 성남시";
    console.log(name, age, birthLocation);
}
var song = {
    title: "Shopper",
    singer: "IU",
};
var project = {
    member: ["kim", "park"],
    days: 30,
    started: true,
};
// 타입을 미리 정하기 애매할 때 (union type, any, unknown)
var user = "kim";
var age = undefined;
var married = false;
var 철수 = [user, age, married];
var 학교 = {
    score: [100, 97, 84],
    teacher: "Phil",
    friend: "John",
};
학교.score[4] = false;
학교.friend = ["Lee", 학교.teacher];
// 함수에 타입 지정하는 법 & void 타입
function hello(name) {
    // name? : string === name : (string, undefined)
    console.log(name ? "안녕하세요" + name : "이름이 없습니다");
}
function countLength(num) {
    return num.toString().length;
}
function marriedPercentage(income, house, charm) {
    var score = 0;
    score += income;
    score += house ? 500 : 0;
    score += charm === "상" ? 100 : 0;
    if (score >= 600) {
        return "결혼 가능";
    }
}
// 타입 확정하기 Narrowing & Assertion
function cleanning(arr) {
    arr.forEach(function (data, idx) {
        if (typeof data == "string") {
            arr[idx] = parseInt(data);
        }
    });
    console.log(arr);
    return arr;
}
function lastSubject(teacher) {
    var answer;
    if (Array.isArray(teacher.subject)) {
        answer = teacher.subject[teacher.subject.length - 1];
    }
    else {
        answer = teacher.subject;
    }
    return answer;
}
