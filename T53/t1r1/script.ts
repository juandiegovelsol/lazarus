const imageUpload: HTMLInputElement = document.getElementById('image-upload') as HTMLInputElement;
const imagePreview: HTMLImageElement = document.getElementById('image-preview') as HTMLImageElement;
const topTextInput: HTMLDivElement = document.getElementById('top-text') as HTMLDivElement;
const bottomTextInput: HTMLDivElement = document.getElementById('bottom-text') as HTMLDivElement;
const topTextFormField: HTMLInputElement = document.getElementById('top-text-input') as HTMLInputElement;
const bottomTextFormField: HTMLInputElement = document.getElementById('bottom-text-input') as HTMLInputElement;
const downloadBtn: HTMLButtonElement = document.getElementById('download-btn') as HTMLButtonElement;

topTextFormField.addEventListener('input', () => {
  topTextInput.innerText = topTextFormField.value;
});

bottomTextFormField.addEventListener('input', () => {
  bottomTextInput.innerText = bottomTextFormField.value;
});

imageUpload.addEventListener('change', (event: Event) => {
  const file: File = (event.target as HTMLInputElement).files[0];
  const reader = new FileReader();

  reader.onload = (e: ProgressEvent<FileReader>) => {
    imagePreview.src = e.target.result as string;
  }
  reader.readAsDataURL(file);
});

downloadBtn.addEventListener('click', () => {
  html2canvas(document.getElementById('meme-container'), {
    allowTaint: true,
    useCORS: true
  })
  .then(canvas => {
    const link = document.createElement('a');
    link.download = 'my-meme.png';
    link.href = canvas.toDataURL();
    link.click();
  });
});