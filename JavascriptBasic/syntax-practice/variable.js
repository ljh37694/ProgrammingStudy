/*
1. 
    함수();
    function 함수() {
        console.log(안녕);
        let 안녕 = 'Hello!';
    } 

    결과: Error
*/

/*
2.
    함수();
    var 함수 = function() {
        console.log(안녕);
        var 안녕 = 'Hello!';
    } 

    결과: Error
    이유: var 함수 = funtion() 형식은 호이스팅될 때 선언만 호이스팅 되고 할당은 호이스팅 되지 않기 때문에 함수() 시점에서는 var 함수는 undifined이기 때문에 에러가 난다.
*/

/*
3. 
    let a = 1;
    var 함수 = function() {
        a = 2;
    }
    console.log(a);

    결과: 1
    이유: 함수를 실행하지 않았다.
*/

/*
4.
    let a = 1;
    var b = 2;
    window.a = 3;
    window.b = 4;

    console.log(a + b);

    결과: 5
    이유: var b와 window.b는 같은 전역변수로 취급하기 때문에 b의 값은 4가 된다. let a는 window.a보다 작은 범위이기 때문에 더 작은 범위인 let a를 참조해서 4 + 1로 5가 된다.
*/

/* 
5.
    setTimeout(function() { console.log(1); }, 1000 ); 
    setTimeout(function() { console.log(2); }, 2000 ); 
    setTimeout(function() { console.log(3); }, 3000 ); 
    setTimeout(function() { console.log(4); }, 4000 ); 
    setTimeout(function() { console.log(5); }, 5000 );

    위 코드를 for문으로 바꿨는데 위의 결과와 다른 결과가 나온다.

    for (var i = 1; i < 6; i++) { 
        setTimeout(function() { console.log(i); }, i*1000 ); 
    }

    해결 방법: var를 let으로 바꾼다.
    에러 이유: var는 범위가 함수라서 사실상 i가 전역 변수가 돼서 i가 6이 되고 1초마다 6을 출력한다.
*/

/*
6.
    var 버튼들 = document.querySelectorAll('button');
    var 모달창들 = document.querySelectorAll('div');

    for (var i = 0; i < 3; i++){
        버튼들[i].addEventListener('click', function(){
            모달창들[i].style.display = "block";
        });
    }

    해결 방법: var i를 let i로 바꾼다.
    에러 이유: var의 범위가 function이라서 i가 전역 변수마냥 되어버려서 반복문을 돌고 i가 3인채로 쓰인다.
*/

var 버튼들 = document.querySelectorAll('button');
var 모달창들 = document.querySelectorAll('div');

for (let i = 0; i < 3; i++){
    버튼들[i].addEventListener('click', function(){
        모달창들[i].style.display = "block";
    });
}