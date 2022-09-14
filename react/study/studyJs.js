

// 배열 안에 있던 데이터를 변수에 담는 기존 방법
const arr = [1,2,3];

const a = arr[0];
const b = arr[1];

console.log(a); // 콘솔창 1 출력
console.log(b); // 콘솔창 2 출력


//Destructuring 방법
const [a,b,c] = [1, 2];

console.log(a); // 콘솔창 1 출력
console.log(b); // 콘솔창 2 출력
console.log(c); // 콘솔창 undefined 출력


//기본값 부여
const [a,b,c = 3] = [1, 2];

console.log(a); // 콘솔창 1 출력
console.log(b); // 콘솔창 2 출력
console.log(c); // 콘솔창 3 출력


//기존 객체의 데이터를 변수에 담는 법
const obj = {
    name: "heeming",
    height: 158,
}
const name = obj.name;
const height = obj.height;

console.log(name); //heeming 출력
console.log(height); //158 출력


//Destructuring 방법
const {name, height} = {name: "heeming", height: 158};

console.log(name); //heeming 출력
console.log(height); //158 출력



//변수를 객체로 넣는 기존 방법
const name = "amy";
const age = 20;
const obj = {name: name, age: age};

console.log(obj.name); //amy 출력
console.log(obj.age); //20 출력



//변수를 객체로 넣는 Destructuring 방법
const name = "amy";
const age = 20;
const obj = {name, age};

console.log(obj.name); //amy 출력
console.log(obj.age); //20 출력




//함수 파라미터 변수에 객체나 배열의 값 넣는 기존 방법
function person(name, age){
    console.log(name);
    console.log(age);
}
var obj = { name : 'Kim', age : 20 }
person(obj.name, obj.age); //kim, 20 출력

var arr = ["park", 30]
person(arr[0], arr[1]); //park, 30 출력


function person({name, age}){
    console.log(name);
    console.log(age);
}
var obj = { name : 'Kim', age : 20 }
person(obj); //kim, 20 출력


function person([name, age]){
    console.log(name);
    console.log(age);
}
var arr = ["park", 30]
person(arr); //park, 30 출력


//중첩 구조 분해
let magician = {
    state: {
        hp: 30,
        mp: 100,
        power: 20,
        int: 80
    },
    skills: ["fireball", "flame"]
}

let {
    state: {
        hp,
        mp,
        power,
        int
    },
    skills: [skill_1, skill_2]
} = magician;

console.log(hp); // 30 출력
console.log(mp); // 100 출력
console.log(power); // 20 출력
console.log(int); // 80 출력
console.log(skill_1); // fireball 출력
console.log(skill_2); // flame 출력