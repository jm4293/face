import * as faceapi from "@vladmandic/face-api";

export async function smileDetect(videoRef, alertedRef, intervalIdRef) {
  // 얼굴 랜드마크와 표정 모델을 반드시 로드해야 함
  await faceapi.nets.faceExpressionNet.loadFromUri("https://justadudewhohacks.github.io/face-api.js/models");
  await faceapi.nets.tinyFaceDetector.loadFromUri("https://justadudewhohacks.github.io/face-api.js/models");

  if (videoRef.current) {
    const video = videoRef.current;

    intervalIdRef.current = setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detections.length > 0) {
        const expressions = detections[0].expressions;
        if (expressions && expressions.happy > 0.7 && !alertedRef.current) {
          alertedRef.current = true;

          alert("웃냐?");

          setTimeout(() => {
            alertedRef.current = false;
          }, 2000);
        }
      }
    }, 300);
  }
}
