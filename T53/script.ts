const imageUpload: HTMLInputElement = document.getElementById('image-upload') as HTMLInputElement;
const imagePreview: HTMLImageElement = document.getElementById('image-preview') as HTMLImageElement;
const topTextInput: HTMLDivElement = document.getElementById('top-text') as HTMLDivElement;
const bottomTextInput: HTMLDivElement = document.getElementById('bottom-text') as HTMLDivElement;
const downloadBtn: HTMLButtonElement = document.getElementById('download-btn') as HTMLButtonElement;

imageUpload.addEventListener('change', (event: Event) => {
  const file: File = (event.target as HTMLInputElement).files[0];
  const reader = new FileReader();

  reader.onload = (e: ProgressEvent<FileReader>) => {
    imagePreview.src = e.target.result as string;
  }
  reader.readAsDataURL(file);
});

downloadBtn.addEventListener('click', () => {
  domtoimage.toPng(document.getElementById('meme-container'))
    .then((dataUrl: string) => {
      const link = document.createElement('a');
      link.download = 'my-meme.png';
      link.href = dataUrl;
      link.click();
    });
});