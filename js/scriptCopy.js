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

const AppData = function() {

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.incomeMonth = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.period = 0;
};

AppData.prototype.check = function() {
    if(salaryAmount.value !== ""){
        calculate.removeAttribute('disabled');
    }
};

AppData.prototype.start = function() {
    if (salaryAmount.value === ""){
        calculate.setAttribute('disabled','true');
        return;
    }

    let allInputFields = document.querySelectorAll('input[type=text]');
        allInputFields.forEach(function(item){
            item.disabled = true;
        });
        calculate.style.display = "none";
        cancelBtn.style.display = "block";

    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getIncome();
    this.getBudget();

    this.showResult();
    console.log(this);
};

AppData.prototype.showResult = function(){
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(", ");
    additionalIncomeValue.value = this.addIncome.join(", ");
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener('change', function(){
        incomePeriodValue.value = _this.budgetMonth * periodSelect.value
    });

};
AppData.prototype.addExpenesBlock = function(){
    
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpensesBtn);
    expensesItems = document.querySelectorAll('.expenses-items');
    let expensesFields = cloneExpensesItem.querySelectorAll('input');

    expensesFields.forEach(function(item){
            item.placeholder = "";
    });


    if(expensesItems.length === 3){
        plusExpensesBtn.style.display = "none"; 
    }

};
AppData.prototype.addIncomeBlock = function(){
    
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, plusIncomeBtn);
    incomeItems = document.querySelectorAll('.income-items');
    let incomeFields = cloneIncomeItem.querySelectorAll('input');

    incomeFields.forEach(function(item){
            item.placeholder = "";
    });

    if(incomeItems.length === 3){
        plusIncomeBtn.style.display = "none"; 
    }

};
AppData.prototype.getExpenses = function() {
    const _this = this;
    expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;

        if(itemExpenses !== "" && cashExpenses !== ""){
            _this.expenses[itemExpenses] = cashExpenses;
        }
    });
};
AppData.prototype.getIncome = function (){
    const _this = this;
    incomeItems.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;

        if(itemIncome !== "" && cashIncome !== ""){
            _this.income[itemIncome] = cashIncome;
        }
    });

    for (let key in this.income){
        this.incomeMonth += +this.income[key]; 
    }
};
AppData.prototype.getAddExpenses = function() {
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(",");
    addExpenses.forEach(function(item){
        item = item.trim();
        if (item !== ""){
            _this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getAddIncome = function(){
    const _this = this;
    additionalIncomeitem.forEach(function(item){
        let itemValue = item.value.trim();
        if(itemValue !== ""){
            _this.addIncome.push(itemValue);
        }
    });
};

AppData.prototype.getExpensesMonth = function() {
   let sum = 0;

   for (let key in this.expenses) {
       sum+= this.expenses[key]*1;
   }

   this.expensesMonth = sum;
};

AppData.prototype.getBudget = function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = +(this.budgetMonth/30).toFixed();
};

AppData.prototype.getTargetMonth = function() {
    if ((targetAmount.value/this.budgetMonth) <= 0 || targetAmount.value === ""){
        return 0;
    }else{
        return Math.ceil(targetAmount.value/this.budgetMonth);
    }
};

AppData.prototype.getStatusIncome = function() {
    let data = this.budgetDay;
    if (data >= 1200){  //9
        return ("У вас высокий уровень дохода")
    }else if (data >= 600 && data < 1200){
        return ("У вас средний уровень дохода")
    }else if (data < 600 && data >= 0){
        return ("К сожалению у вас уровень дохода ниже среднего");
    }else{    // or -> else if(budgetDay < 0) without else
        return ("Что то пошло не так")
    };
};

AppData.prototype.getPeriod = function() {
    periodAmount.textContent = periodSelect.value;
};

AppData.prototype.calcSavedMoney = function() {
    return this.budgetMonth * periodSelect.value;
};


AppData.prototype.reset = function(event){
    event.preventDefault();
    for (let key in this){
        if(Number.isInteger(this[key])){
           this[key] = 0;
        }
    };
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.enableCleanInputs();
    this.deleteAddBlocks();
    console.log(this);
};

AppData.prototype.enableCleanInputs = function(){
    let allInputFields = document.querySelectorAll('input');
    allInputFields.forEach(function(item){
        item.disabled = false;
        item.value = "";
    });
    checkBox.checked = false;
    periodSelect.value = "1";
    periodAmount.textContent = "1";

    calculate.style.display = "block";
    cancelBtn.style.display = "none";
};

AppData.prototype.deleteAddBlocks = function(){
    function deleteElements(element, btn){
        element.forEach(function(item, i){
            if (i !== 0){
                item.remove();
            }
        });
        btn.style.display = ""; 
    }
    deleteElements(incomeItems, plusIncomeBtn);
    deleteElements(expensesItems, plusExpensesBtn);
    
};

AppData.prototype.validateInputs = function(){
    let getAllInputs = document.querySelectorAll('input');
    getAllInputs.forEach(function(item){
        item.addEventListener('input',function(event){
            let text = event.target;
            setTimeout(function() {
                let repl;
                if (event.target.placeholder === "Наименование"){
                    repl = /[^а-яА-ЯёЁ ""()=;.,!?-]/g.exec(text.value);
                } else if(event.target.placeholder === "Сумма"){
                    repl = /[^0-9]/g.exec(text.value);
                }
               text.value = text.value.replace(repl, '');
              }, 0);
        });
    })
};

AppData.prototype.eventListeners = function () {
    appData.validateInputs();

    calculate.addEventListener('click', appData.start.bind(appData));

    plusExpensesBtn.addEventListener('click', appData.addExpenesBlock);

    plusIncomeBtn.addEventListener('click', appData.addIncomeBlock);

    periodSelect.addEventListener('input', appData.getPeriod.bind(appData));

    cancelBtn.addEventListener('click', appData.reset.bind(appData));

};

const appData = new AppData();

appData.eventListeners();