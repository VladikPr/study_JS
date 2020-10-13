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
function getExpensesMonth() {
    return ("Ежемесячные расходы: " + ( amount1 + amount2) + " руб.");
}

// 2)
function getAccumulatedMonth() {
    let budgetMonth = money - (amount1  + amount2);
    return budgetMonth
}

//3) 
let accumulatedMonth = getAccumulatedMonth();

//4
function getTargetMonth() {
    let missionMonth = mission/accumulatedMonth;
    return ("Миссия будет тостигнута через: " + Math.ceil(missionMonth) + " месяцев")
}

//6
budgetDay = accumulatedMonth/30;


function showTypeOf(data){
    return typeof(data);
}

function getStatusIncome(budgetDay){
    if (budgetDay >= 1200){  //9
        return ("У вас высокий уровень дохода")
    }else if (budgetDay >= 600 && budgetDay < 1200){
        return ("У вас средний уровень дохода")
    }else if (budgetDay < 600 && budgetDay >= 0){
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

console.log("Бюджет на месяц: " + getAccumulatedMonth());
console.log(getExpensesMonth());
console.log(getTargetMonth());
console.log("Бюджет на день: " + budgetDay.toFixed());

getStatusIncome();