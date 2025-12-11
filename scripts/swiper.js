// 1. Swiper 설정
const swiper = new Swiper(".gallerySwiper", {
    slidesPerView: 5.5,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    speed: 5000, 
    autoplay: {
        delay: 0, 
    },
});

// 2. 모달 팝업 기능 로직
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('graphicModal');
    const modalImg = document.getElementById('modalImg');
    const closeBtn = document.querySelector('.close-modal');
    
    const swiperWrapper = document.querySelector('.gallerySwiper .swiper-wrapper');

    if(swiperWrapper) {
        swiperWrapper.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
                
                // 모달 열기
                modal.style.display = "flex";
                modalImg.src = e.target.src;
                
                // 모달이 열려있는 동안 뒤의 슬라이더 멈춤
                if(swiper.autoplay.running) {
                    swiper.autoplay.stop();
                }
            }
        });
    }

    // 모달 닫기 함수
    function closeModal() {
        modal.style.display = "none";
        // 닫으면 슬라이더 다시 재생
        swiper.autoplay.start();
    }

    // X 버튼 클릭 시 닫기
    closeBtn.addEventListener('click', closeModal);

    // 모달 배경(이미지 바깥 영역) 클릭 시 닫기
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});