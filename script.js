'use strict';


const books = document.querySelector('.books');
const book = document.querySelectorAll('.book');
const adv = document.querySelector('.adv');
const bookTitel = book[4].querySelector('a');
const chapterTwoSubtitles = book[0].querySelectorAll('li');
const chapterFifthSubtitles = book[5].querySelectorAll('li');
const chapterFifthParent = book[5].querySelector('ul');
const chapterSixthSubtitles = book[2].querySelectorAll('li');
const newListItem = "<li>Глава 8: За пределами ES6</li>";

book[0].before(book[1]);
book[2].before(book[4]);
book[2].before(book[3]);
book[2].before(book[5]);

document.body.style.background = 'url(./image/you-dont-know-js.jpg) center center/cover no-repeat';

adv.remove();

bookTitel.textContent = "Книга 3. this и Прототипы Объектов";

chapterTwoSubtitles[1].after(chapterTwoSubtitles[3]);
chapterTwoSubtitles[7].after(chapterTwoSubtitles[2]);
chapterTwoSubtitles[3].after(chapterTwoSubtitles[6]);
chapterTwoSubtitles[6].after(chapterTwoSubtitles[8]);
chapterTwoSubtitles[9].after(chapterTwoSubtitles[2]);

let arrChapterFifth = [0, 1, 9, 3, 4, 2, 6, 7, 5, 8, 10];

arrChapterFifth.forEach((item)=>{
    chapterFifthParent.append(chapterFifthSubtitles[item]);
});


chapterSixthSubtitles[8].insertAdjacentHTML("afterend",newListItem);