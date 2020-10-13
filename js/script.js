'use strict';

//Lesson 4
//Variables Declaration
let money = +prompt("Ваш месячный доход?",""),
    income = 'Freelance',
    addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую",""),
    deposit = confirm("Есть ли у вас депозит в банке?"),
    mission = 1000000,
    period,
    budgetDay,
    expense1 = prompt("Введите обязательную статью расходов?"),
    amount1 = +prompt("Во сколько это обойдется?"),
    expense2 = prompt("Введите обязательную статью расходов?"),
    amount2 = +prompt("Во сколько это обойдется?");

// Functions Declaration
// 1)
function getExpensesMonth(a,b) {
    return a + b
}

// 2)
function getAccumulatedMonth(revenue, expenditure1, expenditure2) {
    return revenue - (expenditure1  + expenditure2);
}

//3) 
let accumulatedMonth = getAccumulatedMonth(money, amount1, amount2);

//4
function getTargetMonth(target, sumMonth) {
    return Math.ceil(target/sumMonth)
}

//6
budgetDay = accumulatedMonth/30;


function showTypeOf(data){
    return typeof(data);
}

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
//7    
console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));
console.log(addExpenses.toLowerCase().split(", "));

console.log("Бюджет на месяц: " + getAccumulatedMonth(money, amount1, amount2));
console.log("Ежемесячные расходы: " + getExpensesMonth(amount1, amount2) + " руб.");
console.log("Миссия будет тостигнута через: " + getTargetMonth(mission, accumulatedMonth) + " месяцев");
console.log("Бюджет на день: " + budgetDay.toFixed());

console.log(getStatusIncome(budgetDay));