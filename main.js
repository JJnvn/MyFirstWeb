// prompt('my name')
// launch from test.html
console.log("hello world");

// variable declaration
let firstname = "jingjang";
let age = 30;
let height = 1.73;
console.log("My name is", firstname, "na");

// array
let a = ["a", 1, 2, "b"];

// array of object
let students = [
    {
        age: 30,
        name: "jj",
        grade: "B",
        score: 70,
    },
    {
        age: 20,
        name: "ouan",
        grade: "A",
        score: 100,
    },
];

students.push({ name: "ouan2", grade: "F", score: 20 }); // can push object with some key

// loop
for (let i = 0; i < a.length; i++) {
    console.log("index", i, "have value", a[i]);
}
for (let i = 0; i < students.length; i++) {
    console.log(students[i].age);
    console.log(students[i].name);
    console.log(students[i].grade);
}

// function
function calcualate_grade(score) {
    if (score >= 50) {
        console.log("pass");
    } else if (score >= 0) {
        console.log("F");
    }
}

// arrow function
let calcualate_grade_arrow = (score) => {
    if (score >= 50) {
        console.log("pass");
    } else if (score >= 0) {
        console.log("F");
    }
};

calcualate_grade(students[0].score);
calcualate_grade(students[2].score);
calcualate_grade_arrow(students[0].score);
calcualate_grade_arrow(students[2].score);

let good_students = students.filter((s) => {
    if (s.grade != "F") {
        return true;
    } else {
        return false;
    }
});

good_students.forEach((s) => {
    console.log("good student is", s.name);
});

good_students.push({ name: "ngao", age: 19, grade: "A", score: 80 });

let bestStudent = good_students.find((s) => {
    if (s.score >= 80) {
        return true;
    } else {
        return false;
    }
});
console.log(good_students);
console.log(bestStudent); // first student according to condition in list 

let boostScore = good_students.map((s) => {
    // if (s.score < 90){
    //     s.score *= 2
    // }
    // return s
    let newStudent = { ...s };
    if (newStudent.score < 90) {
        newStudent.score *= 2;
    }
    return newStudent;
});

console.log("good_students", good_students);
console.log("boostScore", boostScore);
