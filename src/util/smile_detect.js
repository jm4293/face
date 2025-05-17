import * as faceapi from "@vladmandic/face-api";

export async function smileDetect(videoRef, alertedRef, intervalIdRef, showModal) {
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

          showModal("웃네?");

          setTimeout(() => {
            alertedRef.current = false;
          }, 2000);
        }
      }
    }, 300);
  }
}
