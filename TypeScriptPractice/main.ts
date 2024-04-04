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
function cleanning(arr: (string | number)[]) {
    arr.forEach((data, idx) => {
        if (typeof data == "string") {
            arr[idx] = parseInt(data);
        }
    });

    console.log(arr);

    return arr;
}

function lastSubject(teacher: { subject: string | string[] }): string {
    let answer: string;

    if (Array.isArray(teacher.subject)) {
        answer = teacher.subject[teacher.subject.length - 1];
    } else {
        answer = teacher.subject;
    }

    return answer;
}

// 타입도 변수에 담아쓰세요 type 키워드 써서 & readonly
type ObjectType = {
    color: string;
    size: number;
    readonly position: number[];
};

const object1: ObjectType = {
    color: "red",
    size: 123,
    position: [1, 3],
};

type HumanType = {
    name: string;
    phone: number;
    email?: string;
};

type HumanType1 = {
    name: string;
    phone: number;
    email?: number;
};

type Test = HumanType & HumanType1;

/*
    email은 never로 에러가 생김

    const test : Test = {
        name: "Lee",
        email: "123",
        phone: 123,
    }
 */

type ChildType = {
    isChild: boolean;
};

const human1: HumanType & ChildType = {
    name: "Lee",
    phone: 123,
    isChild: false,
};

// Literal Types로 만드는 const 변수 유사품
type RockScissorPaperType = "가위" | "바위" | "보";
function rockScissorPaper(
    select: RockScissorPaperType
): RockScissorPaperType[] {
    return ["가위", "보", "가위"] as const;
}

// 함수와 methods에 type alias 지정하는 법
type UserInfoType = {
    name: string,
    age: number,
    plusOne: (x : number) => number;
    changeName: () => void;
};

let user1 : UserInfoType = {
    name: "kim",
    age: 30,
    plusOne(x) {
        return x + 1;
    },
    changeName: () => {
        console.log("안녕");
    },
};

user1.plusOne(1);
user1.changeName();

type CutZeroType = (s : string) => string;
type RemoveDashType = (phoneNumber : string) => number;

const cutZero : CutZeroType = (s) => {
    if (s[0] === "0") {
        s = s.slice(1, s.length - 1);
    }

    return s;
};

const removeDash : RemoveDashType = (phoneNumber) => {
    let answer : string = "";

    for (let i = 0; i < phoneNumber.length; i++) {
        if (phoneNumber[i] != "-") {
            answer += phoneNumber[i];
        }
    }
    
    return parseInt(answer);
}

type PhoneNumberType = (phoneNumber: string, cutZero: CutZeroType, removeDash: RemoveDashType) => void;

const phoneNumber : PhoneNumberType = (phoneNumber, cutZero, removeDash) => {
    console.log(removeDash(cutZero(phoneNumber)));
}

phoneNumber("010-1111-2222", cutZero, removeDash);

// 타입스크립트로 HTML 변경과 조작할 때 주의점
let img = document.querySelector("#image");

// img가 null일 수 있어서 instanceof를 사용해서 narrowing을 한다.
if (img instanceof HTMLImageElement) {
    img.src = "new.jpg";
}

let naverLinks = document.querySelectorAll(".naver");

naverLinks.forEach((data) => {
    if (data instanceof HTMLAnchorElement) {
        data.href = "https://kakao.com";
    }
});