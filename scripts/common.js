document.addEventListener('DOMContentLoaded', () => {
    // DOM 요소 선택
    const sliderContainer = document.querySelector('.slider-container');
    const nextControl = document.querySelector('.next-control');
    const nextBtn = document.querySelector('.next-btn');
    const projectText = document.querySelector('.project-text');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    const totalSlides = 6; // HOME, ABOUT, P1, P2, P3, GRAPHIC
    let currentSlide = 0;
    let isScrolling = false; // 연속 스크롤/스와이프 방지 플래그

    /**
     * 지정된 인덱스로 슬라이드를 이동시키고 UI를 업데이트합니다.
     * @param {number} index - 이동할 슬라이드의 인덱스 (0부터 시작)
     */
    function goToSlide(index) {
        if (index < 0 || index >= totalSlides) {
            return;
        }

        currentSlide = index;
        const offset = -currentSlide * 100;
        // CSS transform을 사용하여 가로로 슬라이드 이동
        sliderContainer.style.transform = `translateX(${offset}vw)`;

        updateControls(); 
        updateNavLinkStatus();
    }

    /**
     * 화살표 버튼 및 PROJECT 텍스트의 가시성과 색상을 업데이트합니다.
     * 요청 사항: 
     * - HOME(0): 검은색 화살표
     * - ABOUT(1) ~ P3(4): 흰색 화살표
     * - ABOUT(1): 흰색 화살표 + 흰색 'PROJECT' 텍스트
     * - GRAPHIC(5): 컨트롤 숨김
     */
    function updateControls() {
        // 모든 클래스 초기화
        nextControl.classList.remove('hidden');
        nextBtn.classList.remove('arrow-black', 'arrow-white');
        projectText.style.opacity = 0; 

        // 1. 마지막 슬라이드에서 컨트롤 숨김
        if (currentSlide === totalSlides - 1) { 
            nextControl.classList.add('hidden');
            return;
        }

        // 2. 화살표 색상 설정
        if (currentSlide === 0) { // HOME 슬라이드: 검은색
            nextBtn.classList.add('arrow-black');
        } else { // 슬라이드 1~4: 흰색
            nextBtn.classList.add('arrow-white');

            // 3. PROJECT 텍스트 표시
            if (currentSlide === 1) { // ABOUT ME 슬라이드에서만 표시
                projectText.style.opacity = 1; 
            }
        }
    }

    /**
     * 상단 내비게이션 메뉴의 활성 상태를 업데이트합니다.
     */
    function updateNavLinkStatus() {
        navLinks.forEach(link => {
            link.classList.remove('active');
            const slideIndex = parseInt(link.dataset.slideIndex);

            // 현재 슬라이드와 메뉴 인덱스가 일치하는 경우
            if (currentSlide === slideIndex) {
                link.classList.add('active');
            } 
            // 'PROJECT' 메뉴는 슬라이드 2 (P1)부터 4 (P3)까지 활성화
            else if (link.textContent === 'PROJECT' && currentSlide >= 2 && currentSlide <= 4) {
                link.classList.add('active');
            }
        });
    }

    // --- 이벤트 리스너 ---

    // 1. 화살표 클릭 이벤트
    nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
    });

    // 2. 내비게이션 링크 클릭 이벤트
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            const targetSlideIndex = parseInt(e.target.dataset.slideIndex);
            goToSlide(targetSlideIndex);
        });
    });

    // 3. 마우스 휠(스크롤) 이벤트 (왼쪽/이전 이동은 스크롤로만 가능)
    document.querySelector('.wrap').addEventListener('wheel', (e) => {
        if (isScrolling) return; 
        isScrolling = true;
        e.preventDefault(); 

        const delta = e.deltaY; 

        if (delta > 0) { // 아래로 스크롤 = 다음 슬라이드
            goToSlide(currentSlide + 1);
        } else if (delta < 0 && currentSlide > 0) { // 위로 스크롤 = 이전 슬라이드 (첫 장에서는 막음)
            goToSlide(currentSlide - 1);
        }

        setTimeout(() => {
            isScrolling = false;
        }, 1000); // 슬라이드 전환 시간(0.8s)보다 길게 설정
    }, { passive: false }); 

    // 4. 드래그/스와이프 이벤트 처리
    let touchStartX = 0;
    
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    sliderContainer.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diffX = touchEndX - touchStartX;

        if (Math.abs(diffX) > 50) { // 50px 이상 스와이프 시 이동
            if (diffX < 0) { // 왼쪽으로 스와이프 (다음 슬라이드)
                goToSlide(currentSlide + 1);
            } else if (diffX > 0 && currentSlide > 0) { // 오른쪽으로 스와이프 (이전 슬라이드)
                goToSlide(currentSlide - 1);
            }
        }
    });

    // 앱 로드 시 초기 상태 설정
    goToSlide(0);
});