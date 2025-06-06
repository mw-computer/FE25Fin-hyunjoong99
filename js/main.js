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
function togglePopup(button) {
    const id = button.dataset.popupId;
    const popup = document.getElementById(id);
    if (!popup) return;

    const isVisible = popup.style.display === "block";

    // 모든 팝업 닫기
    document.querySelectorAll('.popup-box').forEach(el => {
        el.style.display = "none";
    });

    // 모든 버튼에서 active 클래스 제거
    document.querySelectorAll('.side-icons .icon-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.removeEventListener('click', outsideClickListener);

    if (!isVisible) {
        const rect = button.getBoundingClientRect();

        popup.style.top = `${rect.top}px`;
        popup.style.right = `${window.innerWidth - rect.left - 50}px`;
        popup.style.display = "block";

        // 활성화 클래스 추가
        button.classList.add('active');

        function outsideClickListener(event) {
            if (!popup.contains(event.target) && !button.contains(event.target)) {
                popup.style.display = "none";
                button.classList.remove('active');  // 닫힐 때 제거
                document.removeEventListener('click', outsideClickListener);
            }
        }

        setTimeout(() => {
            document.addEventListener('click', outsideClickListener);
        }, 0);
    }
}

