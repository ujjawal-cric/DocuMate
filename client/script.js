async function convert() {
  const fileInput = document.getElementById('file');
  const type = document.getElementById('type').value;
  const output = document.getElementById('output');

  if (!fileInput.files.length) return alert('Choose a file');

  const formData = new FormData();
  formData.append('file', fileInput.files[0]);
  formData.append('type', type);

  const res = await fetch('/api/convert', {
    method: 'POST',
    body: formData
  });

  if (type === 'word-pdf') {
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    window.open(url);
  } else {
    const data = await res.json();
    output.textContent = data.text || 'No text found.';
  }
}

function speak() {
  const text = document.getElementById('output').textContent;
  if (!text) return alert('Nothing to read!');
  const msg = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(msg);
}
