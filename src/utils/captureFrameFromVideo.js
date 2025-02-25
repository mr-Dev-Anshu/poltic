import img2 from '../assets/image2.png'
export const captureFrameFromVideo = (videoUrl) =>
    new Promise((resolve) => {
        const video = document.createElement("video");
        video.src = videoUrl;
        video.crossOrigin = "anonymous";
        video.muted = true;
        video.onloadedmetadata = () => {
            const randomTime = Math.random() * video.duration;
            video.currentTime = randomTime;
        };
        video.onseeked = () => {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL("image/png"));
        };
        video.onerror = () => {
            resolve(img2);
        };
    });