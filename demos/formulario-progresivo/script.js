const steps = Array.from(document.querySelectorAll('.step'));
let current = 0;

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle('active', i === index);
  });
  const progress = ((index) / (steps.length - 1)) * 100;
  document.getElementById('progress-bar').style.width = progress + '%';
}

function nextStep() {
  if (current < steps.length - 1) {
    current += 1;
    showStep(current);
    if (current === steps.length - 1) {
      calcularResultado();
    }
  }
}

function calcularResultado() {
  let score = 0;
  const selects = document.querySelectorAll('select');
  selects.forEach(sel => {
    const option = sel.options[sel.selectedIndex];
    const val = parseInt(option.getAttribute('data-score'), 10);
    if (!isNaN(val)) score += val;
  });
  const resultado = document.getElementById('resultado');
  let mensaje = '';
  if (score > 10) {
    mensaje = 'Vale la pena invertir más.';
  } else if (score >= 0) {
    mensaje = 'Hay señales mixtas, procede con cautela.';
  } else {
    mensaje = 'No parece interesada, es mejor alejarse.';
  }
  resultado.textContent = `Puntuación: ${score}. ${mensaje}`;
}

showStep(current);

steps.forEach(step => {
  const btn = step.querySelector('button.next');
  if (btn) btn.addEventListener('click', nextStep);
});
