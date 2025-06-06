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

    document.querySelectorAll('.popup-box').forEach(el => {
        el.style.display = "none";
    });

    document.querySelectorAll('.side-icons .icon-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.removeEventListener('click', outsideClickListener);

    if (!isVisible) {
        const rect = button.getBoundingClientRect();

        popup.style.top = `${rect.top}px`;
        popup.style.right = `${window.innerWidth - rect.left - 50}px`;
        popup.style.display = "block";

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

// 헤더 이미지 변경 코드 및 모달달
const header = document.querySelector("header");
const nav = document.querySelector(".top-nav");
const modal = document.getElementById("navModal");
const images = document.querySelectorAll(".hover-img");

const overlay = document.querySelector(".overlay");
const contentToBlur = Array.from(document.querySelectorAll("body > div, body > section"))
  .filter(el => !el.matches("header, .top-nav, #navModal, .overlay"));

let hideTimeout = null;

function showModal() {
    if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
    }
    header.classList.add("nav-hover");
    modal.style.display = "flex";

    images.forEach(img => {
        const hoverSrc = img.getAttribute("data-hover");
        if (hoverSrc) {
            // 이미 오리지널 이미지가 저장돼 있지 않은 경우만 저장
            if (!img.hasAttribute("data-original")) {
                img.setAttribute("data-original", img.src);
            }
            img.src = hoverSrc;
        }
    });

    overlay.classList.add("active");
    contentToBlur.forEach(el => el.classList.add("blur-background"));
}

function hideModal() {
    header.classList.remove("nav-hover");
    modal.style.display = "none";

    images.forEach(img => {
        const originalSrc = img.getAttribute("data-original");
        if (originalSrc) {
            img.src = originalSrc;
        }
    });

    overlay.classList.remove("active");
    contentToBlur.forEach(el => el.classList.remove("blur-background"));
}

// relatedTarget 체크 함수 (이동한 요소가 nav, modal 인지만 체크, overlay 제외)
function isMovingInside(event) {
    const toElement = event.relatedTarget;
    if (!toElement) return false;
    return nav.contains(toElement) || modal.contains(toElement);
}

function handleMouseLeave(event) {
    if (!isMovingInside(event)) {
        if (event.currentTarget === modal) {
            hideModal();
            hideTimeout = null;
        } else {
            hideTimeout = setTimeout(() => {
                hideModal();
                hideTimeout = null;
            }, 200);
        }
    }
}

nav.addEventListener("mouseenter", showModal);
nav.addEventListener("mouseleave", handleMouseLeave);

modal.addEventListener("mouseenter", showModal);
modal.addEventListener("mouseleave", handleMouseLeave);
