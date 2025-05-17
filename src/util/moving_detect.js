import * as faceapi from "@vladmandic/face-api";

export async function movingDetect(videoRef, canvasRef, prevBoxRef, alertedRef, intervalIdRef) {
  // 얼굴 감지 모델을 반드시 로드해야 함
  await faceapi.nets.tinyFaceDetector.loadFromUri("https://justadudewhohacks.github.io/face-api.js/models");

  if (videoRef.current && canvasRef.current) {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.width;
    canvas.height = video.height;

    intervalIdRef.current = setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, detections);

      if (detections.length > 0) {
        const box = detections[0].box;
        if (prevBoxRef.current) {
          const prev = prevBoxRef.current;
          const dx = box.x + box.width / 2 - (prev.x + prev.width / 2);
          const dy = box.y + box.height / 2 - (prev.y + prev.height / 2);
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > 50 && !alertedRef.current) {
            alertedRef.current = true;

            alert("움직이네?");

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
