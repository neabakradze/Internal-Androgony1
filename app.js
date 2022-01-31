const closeBtn = document.querySelector('.close-btn');
const openBtn = document.querySelector('.nav-bar');
const respHeader = document.querySelector('.responsive-header');
openBtn.addEventListener('click', function () {
    respHeader.style.left = 0;
})
closeBtn.addEventListener('click', function () {
    respHeader.style.left = '-100%';
})