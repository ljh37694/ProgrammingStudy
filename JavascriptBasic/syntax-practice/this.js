let person = {
    name: "손흥민",
    sayHi() {
        console.log(this.name);
    }
}

let record = {
    data: [1, 2, 3, 4, 5],
    sum() {
        let answer = 0;
        this.data.forEach(item => {
            answer += item;
        });

        console.log(answer);
    }
}

person.sayHi();
record.sum();

document.getElementById("btn").addEventListener("click", function() {
    setTimeout(() => {
        console.log(this.innerHTML);
    }, 1000);
});