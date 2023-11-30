const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

btn.addEventListener("click", downloadAndDisplayImages);

function downloadAndDisplayImages() {
  // Map the array of image objects to an array of promises for image downloads
  const imagePromises = images.map((image) => downloadImage(image.url));

  // Use Promise.all to wait for all promises to resolve or reject
  Promise.all(imagePromises)
    .then((downloadedImages) => {
      // All images downloaded successfully, display them in the output div
      output.innerHTML = "";
      downloadedImages.forEach((img) => {
        output.appendChild(img);
      });
    })
    .catch((error) => {
      // Handle any errors during the image downloads
      console.error(error);
    });
}

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image's URL: ${url}`));
  });
}
