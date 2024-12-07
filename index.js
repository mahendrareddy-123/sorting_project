document.getElementById('generateArray').addEventListener('click', generateArray);
document.getElementById('solve').addEventListener('click', solve);

let array = [];

function generateArray() {
  const visualizer = document.getElementById('visualizer');
  const arraySize = parseInt(document.getElementById('arraySize').value) || 10;
  visualizer.innerHTML = '';
  array = [];

  for (let i = 0; i < arraySize; i++) {
    const value = Math.floor(Math.random() * 100) + 1;
    array.push(value);

    const bar = document.createElement('div');
    bar.style.height = `${value * 3}px`;
    bar.classList.add('bar');
    visualizer.appendChild(bar);
  }
}

async function solve() {
  const selectedAlgorithm = document.getElementById('algorithm').value;

  switch (selectedAlgorithm) {
    case 'bubbleSort':
      await bubbleSort();
      break;
    case 'selectionSort':
      await selectionSort();
      break;
    case 'insertionSort':
      await insertionSort();
      break;
    case 'mergeSort':
      await mergeSort();
      break;
    case 'quickSort':
      await quickSort(0, array.length - 1);
      break;
    default:
      alert('Algorithm not implemented yet!');
  }
}

// Bubble Sort
async function bubbleSort() {
  const bars = document.getElementsByClassName('bar');
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.backgroundColor = 'yellow';
      bars[j + 1].style.backgroundColor = 'yellow';

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        bars[j].style.height = `${array[j] * 3}px`;
        bars[j + 1].style.height = `${array[j + 1] * 3}px`;
      }

      await new Promise(resolve => setTimeout(resolve, 100));
      bars[j].style.backgroundColor = '#f08080';
      bars[j + 1].style.backgroundColor = '#f08080';
    }
    bars[array.length - i - 1].style.backgroundColor = 'green';
  }
}

// Selection Sort
async function selectionSort() {
  const bars = document.getElementsByClassName('bar');
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    bars[i].style.backgroundColor = 'yellow';

    for (let j = i + 1; j < array.length; j++) {
      bars[j].style.backgroundColor = 'yellow';

      if (array[j] < array[minIndex]) {
        if (minIndex !== i) bars[minIndex].style.backgroundColor = '#f08080';
        minIndex = j;
      }

      await new Promise(resolve => setTimeout(resolve, 100));
      bars[j].style.backgroundColor = '#f08080';
    }

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      bars[i].style.height = `${array[i] * 3}px`;
      bars[minIndex].style.height = `${array[minIndex] * 3}px`;
    }
    bars[i].style.backgroundColor = 'green';
  }
}

// Insertion Sort
async function insertionSort() {
  const bars = document.getElementsByClassName('bar');
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    bars[i].style.backgroundColor = 'yellow';

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      bars[j + 1].style.height = `${array[j] * 3}px`;
      j--;

      await new Promise(resolve => setTimeout(resolve, 100));
    }
    array[j + 1] = key;
    bars[j + 1].style.height = `${key * 3}px`;
    bars[i].style.backgroundColor = '#f08080';
  }

  for (let k = 0; k < array.length; k++) {
    bars[k].style.backgroundColor = 'green';
  }
}

// Merge Sort
async function mergeSort(start = 0, end = array.length - 1) {
  if (start >= end) return;

  const mid = Math.floor((start + end) / 2);
  await mergeSort(start, mid);
  await mergeSort(mid + 1, end);
  await merge(start, mid, end);
}

async function merge(start, mid, end) {
  const bars = document.getElementsByClassName('bar');
  const left = array.slice(start, mid + 1);
  const right = array.slice(mid + 1, end + 1);

  let i = 0, j = 0, k = start;

  while (i < left.length && j < right.length) {
    bars[k].style.backgroundColor = 'yellow';

    if (left[i] <= right[j]) {
      array[k] = left[i];
      bars[k].style.height = `${array[k] * 3}px`;
      i++;
    } else {
      array[k] = right[j];
      bars[k].style.height = `${array[k] * 3}px`;
      j++;
    }
    k++;
    await new Promise(resolve => setTimeout(resolve, 100));
    bars[k - 1].style.backgroundColor = '#f08080';
  }

  while (i < left.length) {
    array[k] = left[i];
    bars[k].style.height = `${array[k] * 3}px`;
    i++;
    k++;
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  while (j < right.length) {
    array[k] = right[j];
    bars[k].style.height = `${array[k] * 3}px`;
    j++;
    k++;
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  for (let l = start; l <= end; l++) {
    bars[l].style.backgroundColor = 'green';
  }
}

// Quick Sort
async function quickSort(low, high) {
  if (low < high) {
    const pi = await partition(low, high);
    await quickSort(low, pi - 1);
    await quickSort(pi + 1, high);
  }
}

async function partition(low, high) {
  const bars = document.getElementsByClassName('bar');
  const pivot = array[high];
  bars[high].style.backgroundColor = 'yellow';
  let i = low - 1;

  for (let j = low; j < high; j++) {
    bars[j].style.backgroundColor = 'yellow';

    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
      bars[i].style.height = `${array[i] * 3}px`;
      bars[j].style.height = `${array[j] * 3}px`;
    }
    await new Promise(resolve => setTimeout(resolve, 100));
    bars[j].style.backgroundColor = '#f08080';
  }
  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  bars[i + 1].style.height = `${array[i + 1] * 3}px`;
  bars[high].style.height = `${array[high] * 3}px`;

  await new Promise(resolve => setTimeout(resolve, 100));
  bars[high].style.backgroundColor = '#f08080';
  bars[i + 1].style.backgroundColor = 'green';

  return i + 1;
}
