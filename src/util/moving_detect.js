import * as faceapi from "@vladmandic/face-api";

export async function movingDetect(videoRef, prevBoxRef, alertedRef, intervalIdRef, showModal) {
  await faceapi.nets.tinyFaceDetector.loadFromUri("https://justadudewhohacks.github.io/face-api.js/models");

  let moveCount = 0; // 내부에서 카운트 관리

  if (videoRef.current) {
    const video = videoRef.current;

    intervalIdRef.current = setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());

      if (detections.length > 0) {
        const box = detections[0].box;
        if (prevBoxRef.current) {
          const prev = prevBoxRef.current;
          const dx = box.x + box.width / 2 - (prev.x + prev.width / 2);
          const dy = box.y + box.height / 2 - (prev.y + prev.height / 2);
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > 50 && !alertedRef.current) {
            alertedRef.current = true;
            showModal("움직이네?");

            // 내부 카운트 증가
            moveCount += 1;

            // 2번 이상이면 리다이렉트
            if (moveCount >= 2) {
              window.location.href = "https://www.adhd.or.kr/search/search01.php";
            }

            setTimeout(() => {
              alertedRef.current = false;
            }, 2000);
          }
        }
        prevBoxRef.current = box;
      }
    }, 200);
  }
}
