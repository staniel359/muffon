function visualizeAudio() {
  audio = $('audio');
  audio.crossOrigin = 'anonymous'
  var context = new AudioContext();
  var src = context.createMediaElementSource(audio);
  var analyser = context.createAnalyser();
  var canvas = document.getElementById('canvas');
  canvas.width = 223;
  canvas.height = 50;
  var ctx = canvas.getContext('2d');
  src.connect(analyser);
  analyser.connect(context.destination);
  analyser.fftSize = 256;
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);
  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;
  var barWidth = WIDTH / bufferLength;
  var barHeight;
  var x = 0;

  function renderFrame() {
    requestAnimationFrame(renderFrame);
    x = 0;
    analyser.getByteFrequencyData(dataArray);
    ctx.fillStyle = 'rgba(38, 26, 51, 0.7)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    for (var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i]*0.2;
      ctx.fillStyle = '#392d50';
      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
      x += barWidth + 1;
    }
  }
  renderFrame();
};
