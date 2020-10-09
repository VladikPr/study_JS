'use strict';


//Variables declaration
let money = 1200,
    income = 'Freelance',
    addExpenses = 'Social Insurance, Internet, Foodstuff',
    deposit = true,
    mission = 10000,
    period = 8,
    budgetDay = money/30;


//alert('Hello World!');
//console.log("JS is working");

// Second task
console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));

console.log(addExpenses.length);

console.log(`Период равен ${period}`);
console.log("Цель заработать " + mission +" евро");

console.log(addExpenses.toLowerCase().split(", "));

console.log(budgetDay.toFixed());