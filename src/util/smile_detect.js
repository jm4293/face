import * as faceapi from "@vladmandic/face-api";
import React from "react";

export async function smileDetect(videoRef, alertedRef, intervalIdRef, setShowSmileGif, showModal) {
  await faceapi.nets.faceExpressionNet.loadFromUri("https://justadudewhohacks.github.io/face-api.js/models");
  await faceapi.nets.tinyFaceDetector.loadFromUri("https://justadudewhohacks.github.io/face-api.js/models");

  let notSmileTimer = null;
  let smileCount = 0; // 웃음 카운트

  if (videoRef.current) {
    const video = videoRef.current;

    intervalIdRef.current = setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detections.length > 0) {
        const expressions = detections[0].expressions;
        if (expressions && expressions.happy > 0.7) {
          // 웃고 있으면 타이머 초기화 및 GIF 숨김
          if (notSmileTimer) {
            clearTimeout(notSmileTimer);
            notSmileTimer = null;
          }
          setShowSmileGif(false);

          // 웃음 카운트 증가
          smileCount += 1;
          if (smileCount >= 2) {
            showModal("잘 웃네");
            setTimeout(() => {
              window.location.href = "https://www.kpei.co.kr/license/license_112.asp";
            }, 1000);
          }
        } else {
          // 웃지 않으면 2초 후 GIF 표시
          if (!notSmileTimer) {
            notSmileTimer = setTimeout(() => {
              setShowSmileGif(true);
            }, 2000);
          }
        }
      }
    }, 300);
  }
}
