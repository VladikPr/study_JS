'use strict';
// Get required HTML-Elements
let calculate = document.getElementById('start'),
      plusIncomeBtn = document.getElementsByTagName('button')[0],
      plusExpensesBtn = document.getElementsByTagName('button')[1],
      checkBox = document.querySelector('#deposit-check'),
      additionalIncomeitem = document.querySelectorAll('.additional_income-item'),
      budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
      budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
      expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
      additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
      additionalExpensesValue= document.getElementsByClassName('additional_expenses-value')[0],
      incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
      targetMonthValue = document.getElementsByClassName('target_month-value')[0],
      salaryAmount = document.querySelector('.salary-amount'),
      incomeTitle = document.querySelector('.income-items .income-title'),
      incomeItems = document.querySelectorAll('.income-items'),
      expensesItem = document.querySelector('.expenses-items .expenses-title'),
      expensesItems = document.querySelectorAll('.expenses-items'),
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

     

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    incomeMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    period: 0,
    start: function() {
        appData.budget = +salaryAmount.value;
        
        appData.getExpenses();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getIncome();
        appData.getBudget();

        appData.showResult();

    },
    showResult: function(){
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(", ");
        additionalIncomeValue.value = appData.addIncome.join(", ");
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcSavedMoney();
        periodSelect.addEventListener('change', function(){
            incomePeriodValue.value = appData.budgetMonth * periodSelect.value
        });

    },
    addExpenesBlock: function(){
        
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpensesBtn);
        expensesItems = document.querySelectorAll('.expenses-items');

        if(expensesItems.length === 3){
            plusExpensesBtn.style.display = "none"; 
        }

    },
    addIncomeBlock: function(){
        
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, plusIncomeBtn);
        incomeItems = document.querySelectorAll('.income-items');

        if(incomeItems.length === 3){
            plusIncomeBtn.style.display = "none"; 
        }

    },
    getExpenses: function() {
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;

            if(itemExpenses !== "" && cashExpenses !== ""){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function (){
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;

            if(itemIncome !== "" && cashIncome !== ""){
                appData.income[itemIncome] = cashIncome;
            }
        });

        for (let key in appData.income){
            appData.incomeMonth += +appData.income[key]; 
        }
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(",");
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== ""){
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function(){
        additionalIncomeitem.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== ""){
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function() {
       let sum = 0;

       for (let key in appData.expenses) {
           sum+= appData.expenses[key]*1;
       }

       appData.expensesMonth = sum;
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = (appData.budgetMonth/30).toFixed();
    },
    getTargetMonth: function() {
        if ((targetAmount.value/appData.budgetMonth) <= 0 || targetAmount.value === ""){
            return 0;
        }else{
            return Math.ceil(targetAmount.value/appData.budgetMonth);
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
    getPeriod: function() {
        periodAmount.textContent = periodSelect.value;
    },
    calcSavedMoney: function() {
        return appData.budgetMonth * periodSelect.value;
    }
};

calculate.addEventListener('click', function(){
        if(salaryAmount.value !== ""){
            appData.start();
        }
        
 });

plusExpensesBtn.addEventListener('click', appData.addExpenesBlock);

plusIncomeBtn.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('change', appData.getPeriod);

