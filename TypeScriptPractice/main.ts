function PrimitiveType() {
    let name: string = "Lee";
    let age: number = 23;
    let birthLocation: string = "경기도 성남시";

    console.log(name, age, birthLocation);
}

let song: {
    title: string;
    singer: string;
} = {
    title: "Shopper",
    singer: "IU",
};

let project: {
    member: string[];
    days: number;
    started: boolean;
} = {
    member: ["kim", "park"],
    days: 30,
    started: true,
};

// 타입을 미리 정하기 애매할 때 (union type, any, unknown)
let user: string = "kim";
let age: undefined | number = undefined;
let married: boolean = false;
let 철수: (string | undefined | number | boolean)[] = [user, age, married];

let 학교: {
    score: (number | boolean)[];
    teacher: string;
    friend: string | string[];
} = {
    score: [100, 97, 84],
    teacher: "Phil",
    friend: "John",
};
학교.score[4] = false;
학교.friend = ["Lee", 학교.teacher];

// 함수에 타입 지정하는 법 & void 타입
function hello(name?: string): void {
    // name? : string === name : (string, undefined)
    console.log(name ? "안녕하세요" + name : "이름이 없습니다");
}

function countLength(num: number | string): number {
    return num.toString().length;
}

function marriedPercentage(
    income: number,
    house: boolean,
    charm: string
): string | void {
    let score: number = 0;

    score += income;
    score += house ? 500 : 0;
    score += charm === "상" ? 100 : 0;

    if (score >= 600) {
        return "결혼 가능";
    }
}

// 타입 확정하기 Narrowing & Assertion
function cleanning(arr : (string | number)[]) {
    arr.forEach((data, idx) => {
        if (typeof data == "string") {
            arr[idx] = parseInt(data);
        }
    });

    console.log(arr);

    return arr;
}

function lastSubject(teacher : {subject : string | string[]}) : string {
    let answer : string;

    if (Array.isArray(teacher.subject)) {
        answer = teacher.subject[teacher.subject.length - 1];
    }

    else {
        answer = teacher.subject;
    }

    return answer;
}