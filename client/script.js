 const API_BASE = 'https://documate-backend.onrender.com';
 async function convert() {
  const fileInput = document.getElementById('file');
  const type = document.getElementById('type').value;
  const output = document.getElementById('output');
  const spinner = document.getElementById('spinner');

  if (!fileInput.files.length) return alert('Choose a file');

  const formData = new FormData();
  formData.append('file', fileInput.files[0]);
  formData.append('type', type);

  output.textContent = '';
  spinner.style.display = 'block'; // Show spinner

  try {
    const res = await fetch('https://documate-backend.onrender.com/api/convert', {
      method: 'POST',
      body: formData
    });

    if (type === 'word-pdf') {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      window.open(url);
      output.textContent = "✅ PDF generated successfully.";
    } else {
      const data = await res.json();
      output.textContent = data.text || 'No text found.';
    }
  } catch (err) {
    output.textContent = "❌ Conversion failed: " + err.message;
  } finally {
    spinner.style.display = 'none'; // Hide spinner after process
  }
}
function speak() {
  const text = document.getElementById('output').textContent;
  if (!text) return alert('Nothing to read!');
  const msg = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(msg);
}
