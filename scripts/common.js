document.addEventListener('DOMContentLoaded', () => {
    // 1. DOM 요소 선택
    const nextControl = document.querySelector('.next-control');
    const nextBtn = document.querySelector('.next-btn');
    const projectText = document.querySelector('.project-text');
    const navLinks = document.querySelectorAll('.main-nav a');

    // 2. Swiper 초기화 및 설정
    const swiper = new Swiper('.wrap', {
        direction: 'horizontal', // 가로 슬라이드
        grabCursor: true,
        speed: 800, // 넘어가는 속도 (ms)
        mousewheel: true, // 마우스 휠 작동
        keyboard: true, // 키보드 화살표 작동
        allowTouchMove: true, // 터치 스와이프 작동
        
        // [중요] 슬라이드가 바뀔 때마다 실행되는 함수
        on: {
            slideChange: function () {
                // this.activeIndex : 현재 슬라이드 번호 (0, 1, 2...)
                updateUI(this.activeIndex);
            }
        }
    });

    // 3. UI 업데이트 로직 (기존 코드 이식)
    function updateUI(index) {
        const totalSlides = swiper.slides.length;

        // 초기화
        nextControl.classList.remove('hidden');
        nextBtn.classList.remove('arrow-black', 'arrow-white');
        projectText.style.opacity = 0;

        // (1) 마지막 슬라이드 컨트롤 숨김
        if (index === totalSlides - 1) {
            nextControl.classList.add('hidden');
        }

        // (2) 화살표 색상 & 텍스트 제어
        if (index === 0) { // HOME
            nextBtn.classList.add('arrow-black');
        } else { // 그 외
            nextBtn.classList.add('arrow-white');
            
            // ABOUT(index 1)에서만 PROJECT 텍스트 보이기
            if (index === 1) {
                projectText.style.opacity = 1;
            }
        }

        // (3) 네비게이션 메뉴 활성화
        navLinks.forEach(link => {
            link.classList.remove('active');
            const targetIndex = parseInt(link.dataset.slideIndex);

            if (index === targetIndex) {
                link.classList.add('active');
            } else if (link.textContent === 'PROJECT' && index >= 2 && index <= 4) {
                link.classList.add('active');
            }
        });
    }

    // 4. 화살표 버튼 클릭 시 이동
    nextBtn.addEventListener('click', () => {
        swiper.slideNext(); // 다음 슬라이드로
    });

    // 5. 상단 메뉴 클릭 시 이동
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetIndex = parseInt(e.target.dataset.slideIndex);
            swiper.slideTo(targetIndex); // 해당 번호로 이동
        });
    });

    // 초기 상태 실행
    updateUI(0);
});