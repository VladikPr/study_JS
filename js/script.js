'use strict';
// Get required HTML-Elements
let calculate = document.getElementById('start'),
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
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    cancelBtn = document.getElementById('cancel'),
    btnPlus = document.querySelectorAll('.btn_plus');

 
        


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

class AppData {

    constructor(){
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
    }

    check() {
        if(salaryAmount.value !== ""){
            calculate.removeAttribute('disabled');
        }
    }

    start() {
        this.check();
        if (salaryAmount.value === ""){
            calculate.setAttribute('disabled','true');
            return;
        }
    
        const allInputFields = document.querySelectorAll('input[type=text]');
        
        allInputFields.forEach((item) => {
            item.disabled = true;
        });

        calculate.style.display = "none";
        cancelBtn.style.display = "block";
    
        this.budget = +salaryAmount.value;
    
        this.getExpInc();
        this.getExpensesMonth();
        this.getAddExpInc();
        this.getInfoDeposit();
        this.getBudget();
    
        this.showResult();
    }

    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(", ");
        additionalIncomeValue.value = this.addIncome.join(", ");
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
        periodSelect.addEventListener('change', () => {
            incomePeriodValue.value = this.budgetMonth * periodSelect.value
        });
    
    }

    addExpIncBlocks(){
        btnPlus.forEach(item => {
            item.addEventListener('click', (event) => {
                const startStr = event.target.className.split(" ")[1].split("_")[0];
                const patternElements = document.querySelectorAll(`.${startStr}-items`);
        
                const cloneItem = patternElements[0].cloneNode(true);
                patternElements[0].parentNode.insertBefore(cloneItem, event.target);
                const inputFields = cloneItem.querySelectorAll('input');
    
                inputFields.forEach((item) => item.placeholder = "");
        
                if(patternElements.length === 2)event.target.style.display = "none"; 
    
            });
        });
    }

    getExpInc() {

        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if(itemTitle !== "" && itemAmount !== ""){
                this[startStr][itemTitle] = itemAmount;
            }
        }

        incomeItems = document.querySelectorAll('.income-items');
        expensesItems = document.querySelectorAll('.expenses-items');

        expensesItems.forEach(count);
        incomeItems.forEach(count);
        for (let key in this.income){
            this.incomeMonth += +this.income[key]; 
        }
    }

    getAddExpInc(){
        function getValues(inputArray, outputArray){
            inputArray.forEach((item) => {
                item = item.trim();
                if (item !== ""){
                    outputArray.push(item);
                }
            })
        }

        let addIncome = [...additionalIncomeitem].reduce((acc,item) => acc.concat(item.value),[]);
        getValues(addIncome,this.addIncome);
        getValues(additionalExpensesItem.value.split(","),this.addExpenses);
    }

    getExpensesMonth() {
        let sum = 0;
     
        for (let key in this.expenses) {
            sum+= this.expenses[key]*1;
        }
     
        this.expensesMonth = sum;
     }
     
    getBudget() {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = +(this.budgetMonth/30).toFixed();
    }
     
    getTargetMonth() {
        if ((targetAmount.value/this.budgetMonth) <= 0 || targetAmount.value === ""){
            return 0;
        }else{
            return Math.ceil(targetAmount.value/this.budgetMonth);
        }
   }
     
    getStatusIncome() {
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
    }
     
    getPeriod() {
         periodAmount.textContent = periodSelect.value;
    }
     
    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    }
     
    reset(event) {
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
         this. depositHandler();
         
         depositPercent.style.display = 'none'; 
    }

    enableCleanInputs() {
        let allInputFields = document.querySelectorAll('input');
        allInputFields.forEach((item) => {
            item.disabled = false;
            item.value = "";
        });
        checkBox.checked = false;
        periodSelect.value = "1";
        periodAmount.textContent = "1";
    
        calculate.style.display = "block";
        cancelBtn.style.display = "none";
    }
    
    deleteAddBlocks(){
        function deleteElements(element, btn){
            element.forEach((item, i) =>{
                if (i !== 0){
                    item.remove();
                }
            });
            btn.style.display = ""; 
        }
        deleteElements(incomeItems, btnPlus[0]);
        deleteElements(expensesItems, btnPlus[1]);
        
    }
    
    validateInputs() {
        const getAllInputs = document.querySelectorAll('input');
        getAllInputs.forEach((item) =>{
            item.addEventListener('input', (event) => {
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
        });
    }

    getInfoDeposit() {
        if (this.deposit){
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    percentValidation(){
        if (!isNumber(depositPercent.value) || depositPercent.value < 0 || depositPercent.value > 100){
            alert("Введите корректное значение в поле проценты");
            depositPercent.value = 0;
        };
    }

    changePercent(){
        const valueSelect = this.value;
        if (valueSelect === 'other'){
            depositPercent.value = '';
            depositPercent.style.display = 'inline-block'; 
            depositPercent.addEventListener('change', appData.percentValidation);
        } else {
            depositPercent.style.display = 'none'; 
            depositPercent.value = valueSelect;
        }
    }
    depositHandler() {
        if(checkBox.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
/* depositPercent */
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }

    eventListeners() {
        appData.validateInputs();
        appData.addExpIncBlocks();

        salaryAmount.addEventListener('input', this.check);
        calculate.addEventListener('click', this.start.bind(this));
        periodSelect.addEventListener('input', this.getPeriod.bind(this));
        cancelBtn.addEventListener('click', this.reset.bind(this));

        checkBox.addEventListener('change', this.depositHandler.bind(this));
        
    }
};


const appData = new AppData();

appData.eventListeners();



function getAddExpInc(){
    function getValues(inputArray, outputArray){
        inputArray.forEach((item) => {
            item = item.trim();
            if (item !== ""){
                outputArray.push(item);
            }
        })
    }

    let addIncome = [...additionalIncomeitem].reduce((acc,item) => acc.concat(item.value),[]);
    getValues(addIncome,this.addIncome);
    getValues(additionalExpensesItem.value.split(","),this.addExpenses);

}

