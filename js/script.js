'use strict';
// Get required HTML-Elements
const calculate = document.getElementById('start'),
      plusIncomeBtn = document.getElementsByTagName('button')[0],
      plusExpensesBtn = document.getElementsByTagName('button')[1],
      checkBox = document.querySelector('#deposit-check'),
      additionalExpensesitem = document.querySelectorAll('.additional_income-item'),
      budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
      budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
      expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
      additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
      additionalExpensesValue= document.getElementsByClassName('additional_expenses-value')[0],
      incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
      targetMonthValue = document.getElementsByClassName('target_month-value')[0],
      salaryAmount = document.querySelector('.salary-amount'),
      incomeItem = document.querySelector('.income-items .income-title'),
      incomeAmount = document.querySelector('.income-amount'),
      expensesItem = document.querySelector('.expenses-items .expenses-title'),
      expensesAmount = document.querySelector('.expenses-amount'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      depositBank = document.querySelector('option'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercent = document.querySelector('.deposit-percent'),
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select'),
      periodAmount = document.querySelector('.period-amount'),
      cancelBtn = document.getElementById('cancel');


let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

function getCapitalize(array){
    let newArray = [];
    array.forEach(function(item){
        item = item.replace(/ +/g, ' ').trim();
        newArray.push(item[0].toUpperCase() + item.slice(1));
    });
    return newArray.join(", ");
}

let money,
     start = function() {
        do{
            money = prompt("Ваш месячный доход?","");
        } while (!isNumber(money) || money === "" || money === null); 
    };

/* start(); */


let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    asking: function() {
        let itemIncome,
            cashIncome;

        if(confirm("Есть ли у вас дополнительный источник заработка?")) {
            do{

            itemIncome = prompt("Какой у Вас дополнительный заработок?","");
            cashIncome = prompt("Сколько в месяц вы на этом зарабатываете?","");
    
            } while(isNumber(itemIncome) || isNumber === "" || itemIncome === null 
            || !isNumber(cashIncome) || cashIncome === "" || cashIncome === null);

            appData.income[itemIncome] = cashIncome;
        }
        
        let addExpenses;
        do{
            addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую","");
        } while (isNumber(addExpenses) || addExpenses === "" || addExpenses === null);

        appData.addExpenses = addExpenses.toLowerCase().split(",");

        appData.deposit = confirm("Есть ли у вас депозит в банке?");
        //Month expenses
        for (let i = 0; i < 2; i++) {
            
            let a = prompt("Введите обязательную статью расходов в этом месяце", ""),
            b = prompt("Во сколько обойдется", "");
    
            if (!isNumber(a) && (typeof(a)) != null && (typeof(b)) != null
            && a !=''  && b !='' && isNumber(b)){
                appData.expenses[a] = b;
            } else{
                i = i - 1 ;
            }  
        }
    },
    getExpensesMonth: function() {
       let sum = 0;

       for (let key in appData.expenses) {
           sum+= appData.expenses[key]*1;
       }

       appData.expensesMonth = sum;
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = (appData.budgetMonth/30).toFixed();
    },
    getTargetMonth: function() {
        if ((appData.mission/appData.budgetMonth) <= 0){
            return ("Цель не будет достигнута");
        }else{
            return ("Цель будет достигнута через " + Math.ceil(appData.mission/appData.budgetMonth) + " месяц");
        }
    },
    getStatusIncome: function() {
        let data = appData.budgetDay;
        if (data >= 1200){  //9
            return ("У вас высокий уровень дохода")
        }else if (data >= 600 && data < 1200){
            return ("У вас средний уровень дохода")
        }else if (data < 600 && data >= 0){
            return ("К сожалению у вас уровень дохода ниже среднего");
        }else{    // or -> else if(budgetDay < 0) without else
            return ("Что то пошло не так")
        };
    },
    getInfoDeposit: function() {
        if(appData.deposit) {
            let a,
                b
            do{
                a = prompt('Какой годовой процент?', '10');
                b = prompt('Какая сумма заложена?', 10000);
            } while (!isNumber(a) || !isNumber(a) || a === "" || b === "" || a === null || b === null);
            appData.percentDeposit = a;
            appData.moneyDeposit = b;
            
        }
    },
    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
    }
};


/* //Variables Declaration
//Additional expenses
appData.asking();
//Month expenses
appData.getExpensesMonth();
//Month budget
appData.getBudget();
//Deposit
appData.getInfoDeposit();



// Fuctions Output 
console.log("Бюджет на месяц: " + appData.budgetMonth);
console.log("Ежемесячные расходы: " + appData.expensesMonth + " руб.");
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome()); 

console.log();
console.log("Наша программа включает в себя данные:");
for (let key in appData){
    console.log(key + ":" + appData[key]); 
};

console.log();
console.log(getCapitalize(appData.addExpenses)); */
