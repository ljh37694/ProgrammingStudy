function PrimitiveType() {
    let name : string = "Lee";
    let age : number = 23;
    let birthLocation : string = "경기도 성남시"

    console.log(name, age, birthLocation);
}

let song : {
    title: string,
    singer: string,
} = {
    title: "Shopper",
    singer: "IU",
};

let project : {
    member: string[],
    days: number,
    started: boolean,
} = {
    member : ['kim', 'park'],
    days : 30,
    started : true,
};