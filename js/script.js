'use strict';


//Variables declaration
let money = 100000,
    income = 'Freelance',
    addExpenses = 'Social Insurance, Internet, Foodstuff',
    deposit = true,
    mission = 1000000,
    period = 8,
    budgetDay = money/30;


//alert('Hello World!');
//console.log("JS is working");

//Lesson 02
console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));

console.log(addExpenses.length);

console.log(`Период равен ${period}`);
console.log("Цель заработать " + mission +" евро");

console.log(addExpenses.toLowerCase().split(", "));

console.log(budgetDay.toFixed());



//Lesson 03
money = +prompt("Ваш месячный доход?",""); //2)
addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую","");  //3)
deposit = confirm("Есть ли у вас депозит в банке?");  //4)

let expense1 = prompt("Введите обязательную статью расходов?"),  //5)
    amount1 = +prompt("Во сколько это обойдется?"),
    expense2 = prompt("Введите обязательную статью расходов?"),
    amount2 = +prompt("Во сколько это обойдется?");

let budgetMonth = money - (amount1  + amount2); //6)

let missionMonth = mission / budgetMonth;  //7)
console.log("Миссия будет тостигнута через: " + Math.ceil(missionMonth));

budgetDay = budgetMonth/30; //8)

if (budgetDay >= 1200){
    console.log("У вас высокий уровень дохода");
}else if (budgetDay >= 600 && budgetDay < 1200){
    console.log("У вас средний уровень дохода");
}else if (budgetDay < 600 && budgetDay >= 0){
    console.log("К сожалению у вас уровень дохода ниже среднего");
}else{    // or -> else if(budgetDay < 0) without else
    console.log("Что то пошло не так");
};



