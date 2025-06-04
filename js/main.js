// 화면 오른쪽 버튼들 화면 내릴때/올릴때 부드럽게 따라오게 하기기
const scrollBtn = document.querySelector('.scroll-top-btn');
let lastScrollY = window.scrollY;
let targetBottom = 20;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
        targetBottom = 20;
    } else {
        targetBottom = 40;
    }
    lastScrollY = currentScrollY;
    scrollBtn.style.bottom = targetBottom + 'px';
});