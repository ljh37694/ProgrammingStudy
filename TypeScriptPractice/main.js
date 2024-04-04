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
var object1 = {
    color: "red",
    size: 123,
    position: [1, 3],
};
var human1 = {
    name: "Lee",
    phone: 123,
    isChild: false,
};
function rockScissorPaper(select) {
    return ["가위", "보", "가위"];
}
var user1 = {
    name: "kim",
    age: 30,
    plusOne: function (x) {
        return x + 1;
    },
    changeName: function () {
        console.log("안녕");
    },
};
user1.plusOne(1);
user1.changeName();
var cutZero = function (s) {
    if (s[0] === "0") {
        s = s.slice(1, s.length - 1);
    }
    return s;
};
var removeDash = function (phoneNumber) {
    var answer = "";
    for (var i = 0; i < phoneNumber.length; i++) {
        if (phoneNumber[i] != "-") {
            answer += phoneNumber[i];
        }
    }
    return parseInt(answer);
};
var phoneNumber = function (phoneNumber, cutZero, removeDash) {
    console.log(removeDash(cutZero(phoneNumber)));
};
phoneNumber("010-1111-2222", cutZero, removeDash);
// 타입스크립트로 HTML 변경과 조작할 때 주의점
var img = document.querySelector("#image");
// img가 null일 수 있어서 instanceof를 사용해서 narrowing을 한다.
if (img instanceof HTMLImageElement) {
    img.src = "new.jpg";
}
var naverLinks = document.querySelectorAll(".naver");
naverLinks.forEach(function (data) {
    if (data instanceof HTMLAnchorElement) {
        data.href = "https://kakao.com";
    }
});
