const imageUpload: HTMLInputElement = document.getElementById('image-upload') as HTMLInputElement;
const imagePreview: HTMLImageElement = document.getElementById('image-preview') as HTMLImageElement;
const topTextInput: HTMLDivElement = document.getElementById('top-text') as HTMLDivElement;
const bottomTextInput: HTMLDivElement = document.getElementById('bottom-text') as HTMLDivElement;
const topTextEditableInput: HTMLInputElement = document.getElementById('top-text-input') as HTMLInputElement;
const bottomTextEditableInput: HTMLInputElement = document.getElementById('bottom-text-input') as HTMLInputElement;
const downloadBtn: HTMLButtonElement = document.getElementById('download-btn') as HTMLButtonElement;

imageUpload.addEventListener('change', (event: Event) => {
  const file: File = (event.target as HTMLInputElement).files[0];
  const reader = new FileReader();

  reader.onload = (e: ProgressEvent<FileReader>) => {
    imagePreview.src = e.target.result as string;
  }
  reader.readAsDataURL(file);
});

topTextEditableInput.addEventListener('input', () => {
  topTextInput.textContent = topTextEditableInput.value;
});

bottomTextEditableInput.addEventListener('input', () => {
  bottomTextInput.textContent = bottomTextEditableInput.value;
});

downloadBtn.addEventListener('click', () => {
  html2canvas(document.getElementById('meme-container'), {
    useCORS: true
  })
    .then((canvas) => {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'my-meme.png';
      link.href = dataUrl;
      link.click();
    });
});