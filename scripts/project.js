// --- Project Link Image Hover Logic ---

// 1. 필요한 이미지 경로와 기본 색상 정의
// HTML에서 이미지 경로는 './images/link.png'로 확인되었습니다.
const defaultArrowSrc = './images/link.png'; // 실제 HTML 경로로 수정
const hoverArrowSrc = './images/link_hover.png'; // 호버 이미지 경로는 기존대로 유지

// 이전에 CSS에 설정된 기본 색상들을 여기에 정의해야 합니다.
// **주의: 실제 CSS의 기본 텍스트 및 테두리 색상으로 설정해야 정확히 복구됩니다.**
const defaultTextColor = '#aaa'; // 원래 텍스트 색상 (검은색이라고 가정)
const defaultBorderColor = '#aaa'; // 원래 테두리 색상 (검은색이라고 가정)

// 2. 모든 '.link' 내부의 'a' 요소를 가져옵니다.
const linkItems = document.querySelectorAll('.link a');

// 3. 각 링크 아이템에 이벤트 리스너를 등록합니다.
linkItems.forEach(anchor => {
    // 3-1. anchor (<a>) 태그 내부의 <img> 요소를 찾습니다.
    const image = anchor.querySelector('img');
    // 3-2. anchor (<a>) 태그 내부의 <span> 텍스트 요소를 찾습니다.
    const textSpan = anchor.querySelector('span');
    
    // a 태그와 img, span이 모두 존재하는지 확인
    if (image && textSpan) {
        // --- 마우스 진입 시 (mouseover) ---
        anchor.addEventListener('mouseover', () => {
            // 1. 이미지 경로를 hover 이미지로 변경
            image.src = hoverArrowSrc;
            
            // 2. 테두리 색상 변경 (<a> 태그 자체에 border가 적용되어 있다고 가정)
            anchor.style.borderColor = '#fff';
            
            // 3. 텍스트 색상 변경 (<span> 태그의 color를 변경)
            textSpan.style.color = '#fff'; 
        });

        // --- 마우스 벗어날 시 (mouseout) ---
        anchor.addEventListener('mouseout', () => {
            // 1. 이미지 경로를 원래 이미지로 복구
            image.src = defaultArrowSrc;
            
            // 2. 테두리 색상을 원래 색상으로 복구
            anchor.style.borderColor = defaultBorderColor;
            
            // 3. 텍스트 색상을 원래 색상으로 복구
            textSpan.style.color = defaultTextColor; 
        });
    }
});