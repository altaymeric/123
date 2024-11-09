class DrawingApp {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.isDrawing = false;
    this.setupCanvas();
    this.setupControls();
    this.setupEventListeners();
  }

  setupCanvas() {
    // Set initial canvas background
    this.ctx.fillStyle = '#1a1a1a';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Set default stroke style
    this.ctx.strokeStyle = '#646cff';
    this.ctx.lineWidth = 5;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
  }

  setupControls() {
    this.colorPicker = document.getElementById('colorPicker');
    this.brushSize = document.getElementById('brushSize');
    this.clearButton = document.getElementById('clearButton');

    this.colorPicker.addEventListener('input', (e) => {
      this.ctx.strokeStyle = e.target.value;
    });

    this.brushSize.addEventListener('input', (e) => {
      this.ctx.lineWidth = e.target.value;
    });

    this.clearButton.addEventListener('click', () => {
      this.ctx.fillStyle = '#1a1a1a';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    });
  }

  setupEventListeners() {
    this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
    this.canvas.addEventListener('mousemove', this.draw.bind(this));
    this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
    this.canvas.addEventListener('mouseout', this.stopDrawing.bind(this));
  }

  startDrawing(e) {
    this.isDrawing = true;
    this.ctx.beginPath();
    const rect = this.canvas.getBoundingClientRect();
    this.ctx.moveTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
  }

  draw(e) {
    if (!this.isDrawing) return;
    const rect = this.canvas.getBoundingClientRect();
    this.ctx.lineTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
    this.ctx.stroke();
  }

  stopDrawing() {
    this.isDrawing = false;
  }
}

// Initialize the drawing app
new DrawingApp();