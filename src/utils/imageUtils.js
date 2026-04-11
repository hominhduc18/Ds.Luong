/**
 * Tiện ích xử lý hình ảnh bằng Canvas API
 * Bao gồm: Resize, Crop vuông, Chỉnh độ sáng/tương phản, Nén ảnh
 */

export const processImage = async (file, options = { width: 800, height: 800, quality: 0.8 }) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // 1. Tính toán kích thước crop vuông (Center Crop)
        const minSide = Math.min(img.width, img.height);
        const sourceX = (img.width - minSide) / 2;
        const sourceY = (img.height - minSide) / 2;

        canvas.width = options.width;
        canvas.height = options.height;

        // 2. Vẽ ảnh đã crop và resize lên canvas
        ctx.drawImage(
          img,
          sourceX, sourceY, minSide, minSide, // Nguồn (crop)
          0, 0, options.width, options.height // Đích (resize)
        );

        // 3. Tự động điều chỉnh độ sáng/tương phản nếu cần
        adjustImage(ctx, options.width, options.height);

        // 4. Xuất ảnh dưới dạng Base64 (hoặc Blob nếu cần)
        const processedData = canvas.toDataURL('image/jpeg', options.quality);
        resolve(processedData);
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

/**
 * Hàm điều chỉnh độ sáng và tương phản đơn giản
 */
function adjustImage(ctx, width, height) {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  
  // Tính độ sáng trung bình
  let totalBrightness = 0;
  for (let i = 0; i < data.length; i += 4) {
    totalBrightness += (data[i] + data[i+1] + data[i+2]) / 3;
  }
  const avgBrightness = totalBrightness / (width * height);

  // Nếu ảnh quá tối (avg < 80), tăng độ sáng
  const brightnessBoost = avgBrightness < 80 ? 20 : 0;
  const contrastFactor = 1.1; // Tăng nhẹ tương phản

  for (let i = 0; i < data.length; i += 4) {
    data[i] = truncate((data[i] - 128) * contrastFactor + 128 + brightnessBoost);
    data[i+1] = truncate((data[i+1] - 128) * contrastFactor + 128 + brightnessBoost);
    data[i+2] = truncate((data[i+2] - 128) * contrastFactor + 128 + brightnessBoost);
  }

  ctx.putImageData(imageData, 0, 0);
}

function truncate(value) {
  return Math.min(255, Math.max(0, value));
}

/**
 * Tạo 3 phiên bản ảnh: thumbnail, medium, large
 */
export const createImageVariants = async (file) => {
  const large = await processImage(file, { width: 800, height: 800, quality: 0.7 });
  const medium = await processImage(file, { width: 400, height: 400, quality: 0.8 });
  const thumbnail = await processImage(file, { width: 150, height: 150, quality: 0.9 });
  
  return { large, medium, thumbnail };
};
