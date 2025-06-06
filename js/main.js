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

// 푸터 버튼(페이지 상단으로 이동하는 버튼임임)
function scrollFooterToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 공지사항 드랍박스 필터 코드
function filterNotices() {
    const filter = document.getElementById('noticeFilter').value;
    const items = document.querySelectorAll('.notice-item');

    items.forEach(item => {
        const type = item.getAttribute('data-type');
        if (filter === 'all' || type === filter) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}