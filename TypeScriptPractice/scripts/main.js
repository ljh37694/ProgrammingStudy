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
// class 만들 때 타입지정 가능
var Car = /** @class */ (function () {
    function Car(model, price) {
        this.model = model;
        this.price = price;
    }
    Car.prototype.tax = function () {
        return this.price / 10;
    };
    return Car;
}());
var car1 = new Car("스파크", 500);
console.log(car1);
console.log(car1.tax());
var Word = /** @class */ (function () {
    function Word() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = this;
        this.num = [];
        this.str = [];
        args.forEach(function (data) {
            if (typeof data === "number") {
                _this.num.push(data);
            }
            else {
                _this.str.push(data);
            }
        });
    }
    return Word;
}());
var word1 = new Word('kim', 3, 5, 'park');
console.log(word1.num); //[3,5]
console.log(word1.str); //['kim', 'park']
var Cart = [{ product: '청소기', price: 7000 }, { product: '삼다수', price: 800 }];
var Calc = {
    plus: function (a, b) {
        return a + b;
    },
    minus: function (a, b) {
        return a - b;
    }
};
// 함수 rest 파라미터, destructuring 할 때 타입지정
var person = { student: true, age: 20 };
function func1(_a) {
    var student = _a.student, age = _a.age;
    console.log(student, age);
}
func1({ student: true, age: 20 });
function findMaxNum() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var maxNum = 0;
    args.forEach(function (num) {
        if (maxNum > num) {
            maxNum = num;
        }
    });
    return maxNum;
}
function func2(_a) {
    var user = _a.user, comment = _a.comment, admin = _a.admin;
    console.log(user, comment, admin);
}
func2({ user: "Lee", comment: [3, 5, 4], admin: false });
function func3(_a) {
    var a = _a[0], b = _a[1], c = _a[2];
    console.log(a, b, c);
}
func3([40, 'wine', false]);
// class에서 사용가능한 protected, static 키워드
var User = /** @class */ (function () {
    function User() {
    }
    User.printX = function () {
        console.log(User.x);
    };
    User.x = 10; // static 키워드가 있으면 instance.attr가 아니라 className.attr를 쓸 수 있음
    User.y = 20;
    User.addOne = function (num) {
        User.x += num;
    };
    return User;
}());
User.addOne(3); //이렇게 하면 x가 3 더해져야함
User.addOne(4); //이렇게 하면 x가 4 더해져야함
User.printX(); //이렇게 하면 콘솔창에 x값이 출력되어야함
var Square = /** @class */ (function () {
    function Square(width, height, color) {
        var _this = this;
        this.draw = function () {
            var box = document.createElement("div");
            var x = Math.random() * 400;
            var y = Math.random() * 400;
            box.style.width = "".concat(_this.width, "px");
            box.style.height = "".concat(_this.height, "px");
            box.style.backgroundColor = _this.color;
            box.style.position = "absolute";
            box.style.top = "".concat(x, "px");
            box.style.left = "".concat(y, "px");
            console.log(box);
            document.body.appendChild(box);
        };
        this.width = width;
        this.height = height;
        this.color = color;
    }
    return Square;
}());
;
var sqaure = new Square(30, 30, "red");
for (var i = 0; i < 8; i++) {
    sqaure.draw();
}
