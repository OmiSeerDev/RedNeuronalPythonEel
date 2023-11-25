let index = 0;
class VectorConfig {
  neurons;
  IMAGE_LOAD_SIZE;
  epoch_number;
  constructor() {}
  setNeurons(neurons) {
    this.neurons = neurons;
  }
  setEpochs(epochs) {
    this.epoch_number = epochs;
  }
  setLoadSz(loadsz) {
    this.IMAGE_LOAD_SIZE = loadsz;
  }
}
const vectorA = new VectorConfig();

function addRow(neu, lot, epo, meanPre, meanLos, maxPre, maxLos) {
  const table = document.getElementById("metrics");
  const row = table.insertRow(-1);

  const cell0 = row.insertCell(0);
  const cell1 = row.insertCell(1);
  const cell2 = row.insertCell(2);
  const cell3 = row.insertCell(3);
  const cell4 = row.insertCell(4);
  const cell5 = row.insertCell(5);
  const cell6 = row.insertCell(6);

  cell0.id = `neu${index}`;
  cell1.id = `lot${index}`;
  cell2.id = `epo${index}`;
  cell3.id = `meanPre${index}`;
  cell4.id = `meanLos${index}`;
  cell5.id = `maxPre${index}`;
  cell6.id = `maxLos${index}`;

  document.getElementById(`neu${index}`).innerHTML = neu;
  document.getElementById(`lot${index}`).innerHTML = lot;
  document.getElementById(`epo${index}`).innerHTML = epo;
  document.getElementById(`meanPre${index}`).innerHTML = meanPre;
  document.getElementById(`meanLos${index}`).innerHTML = meanLos;
  document.getElementById(`maxPre${index}`).innerHTML = maxPre;
  document.getElementById(`maxLos${index}`).innerHTML = maxLos;

  index++;
}

window.addEventListener("DOMContentLoaded", () => {
  const neuronInput = document.getElementById("neuronsNum");
  const loadSzInput = document.getElementById("loadSize");
  const epochInput = document.getElementById("epochNum");

  neuronInput.addEventListener("input", () =>
    vectorA.setNeurons(neuronInput.value)
  );
  loadSzInput.addEventListener("input", () =>
    vectorA.setLoadSz(loadSzInput.value)
  );
  epochInput.addEventListener("input", () =>
    vectorA.setEpochs(epochInput.value)
  );

  async function generate_model(neurons, loadSize, epochs) {
    let result = await eel.generate_model(neurons, loadSize, epochs)();
    const meanAccuracy = (result[1].reduce((a, b) => a + b, 0) / epochs) * 100;
    const meanLoss = result[0].reduce((a, b) => a + b, 0) / epochs;
    const maxAccuracy = Math.max(...result[1]) * 100;
    const maxLoss = Math.max(...result[0]);
    console.log(result[2])

    addRow(
      neurons,
      loadSize,
      epochs,
      `${Number(meanAccuracy).toFixed(2)}%`,
      `${Number(meanLoss).toFixed(2)}%`,
      `${Number(maxAccuracy).toFixed(2)}%`,
      `${Number(maxLoss).toFixed(2)}%`
    );
  }

  let run = document.getElementById("run");
  run.addEventListener("click", () => {
    generate_model(
      vectorA.neurons,
      vectorA.IMAGE_LOAD_SIZE,
      vectorA.epoch_number
    );
  });
});
