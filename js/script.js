'use strict';

//Lesson 5
//Variables Declaration
let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    income = 'Freelance',
    addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую",""),
    deposit = confirm("Есть ли у вас депозит в банке?"),
    mission = 1000000,
    period,
    budgetDay,
    expenses = [];

    

// Functions Declaration
let start = function() {
    do{
        money = +prompt("Ваш месячный доход?","");
    } while (!isNumber(money)); 
}

start();

function showTypeOf(data){
    return typeof(data);
}


function getExpensesMonth() {
    let sum = 0;
    let a = 0;
    for (let i = 0; i < 2; i++) {

        expenses[i] = prompt("Введите обязательную статью расходов?","");    

       do{
        a = +prompt("Во сколько это обойдется?");
       }while(!isNumber(a));
       sum+= a;
    }
    console.log(expenses);
    return sum;
}

let expensesAmount = getExpensesMonth();


function getAccumulatedMonth(revenue, expenses) {
    return revenue - expenses;
}


let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);


function getTargetMonth(target, sumMonth) {
    if ((target/sumMonth <= 0)){
        return ("Цель не будет достигнута");
    }else{
        return ("Цель будет достигнута через " + Math.ceil(target/sumMonth) + " месяц");
    }
}


budgetDay = accumulatedMonth/30;



function getStatusIncome(data){
    if (data >= 1200){  //9
        return ("У вас высокий уровень дохода")
    }else if (data >= 600 && data < 1200){
        return ("У вас средний уровень дохода")
    }else if (data < 600 && data >= 0){
        return ("К сожалению у вас уровень дохода ниже среднего");
    }else{    // or -> else if(budgetDay < 0) without else
        return ("Что то пошло не так")
    };
}

// Fuctions Output 
console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));
console.log(addExpenses.toLowerCase().split(", "));

console.log("Бюджет на месяц: " + accumulatedMonth);
console.log("Ежемесячные расходы: " + expensesAmount + " руб.");
console.log(getTargetMonth(mission, accumulatedMonth));
console.log("Бюджет на день: " + budgetDay.toFixed());

console.log(getStatusIncome(budgetDay));