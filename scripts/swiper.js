const swiper = new Swiper(".gallerySwiper", {
    slidesPerView: 5.5,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    speed: 5000, // 전체 이동 속도 (클수록 느린 흐름)
    autoplay: {
        delay: 0, // 멈춤 없이 바로 시작
        disableOnInteraction: false,
    },
});
