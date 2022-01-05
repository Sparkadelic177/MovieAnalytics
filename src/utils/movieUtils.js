function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

const calculateMean = (data) => {
  let mean = 0;
  for (let movie of data) {
    mean += movie.boxOffice;
  }
  console.log(mean);
  return (mean = mean !== 0 ? mean / data.length : mean);
};

const calculateDeviation = (data) => {
  if (!data || data.length === 0) return 0;

  const mean = calculateMean(data);

  const newData = data.map((k) => {
    return (k.boxOffice - mean) ** 2;
  });

  let sum = newData.reduce((acc, curr) => acc + curr, 0);

  return Math.sqrt(sum / data.length);
};

const calculateMedian = (data) => {
  if (!data || data.length === 0) return 0;

  data.sort((a, b) => {
    a.RT - b.RT;
  });

  var half = Math.floor(data.length / 2);

  if (data.length % 2) return data[half].RT;

  return (data[half - 1].RT + data[half].RT) / 2.0;
};

const moviesReturned = (moviesData, searchedData) => {
  if (Array.isArray(moviesData)) {
    return moviesData;
  }

  alert(`There are no movies for: ${searchedData}`);
  return [];
};

export {
  calculateMean,
  calculateDeviation,
  calculateMedian,
  moviesReturned,
  currencyFormat
};
