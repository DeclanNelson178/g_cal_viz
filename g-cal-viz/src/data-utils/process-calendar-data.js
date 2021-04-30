const colors = {
  0: 'Default Calendar Color (Light Blue)',
  1: 'Lavendar',
  2: 'Sage',
  3: 'Grape',
  4: 'Flamingo',
  5: 'Banana',
  6: 'Tangerine',
  7: 'Peacock',
  8: 'Graphite',
  9: 'Blueberry',
  10: 'Basil'
}

const colorCounts = (events) => {
  const colorMap = {};
  events.forEach(event => {
    if (event.colorId in colorMap) {
      colorMap[event.colorId] += 1;
    } else {
      colorMap[event.colorId] = 1;
    }
  });

  return colorMap;
}

const processText = (events) => {
  const wordMap = {};
  events.forEach(event => {
    const summary = event.summary;
    if (summary in wordMap) {
      wordMap[summary] += 1;
    } else {
      wordMap[summary] = 1;
    }
  });

  return wordMap;
}

module.exports = {
  colorCounts,
  processText
}