export const getQuote = data => {
  const quoteList = handleSheet(data);
  const selectedIndex = randomNumber(quoteList.length);
  return quoteList[selectedIndex];
};

// cleans data and returns the content of the sheet
// as an array of arrays
export const handleSheet = data => {
  const cleanData = data.feed.entry;
  let result = [];
  let fields = [];
  let currentRow = [];
  for (const index in cleanData) {
    let location = cleanData[index].title.$t;
    let value = cleanData[index].content.$t;

    // check if its the first row -> fields
    if (location[1] === '1') {
      fields.push(value);
    } else {
      if (result.length === 0) {
        // so fields get added just once
        result.push(fields);
      }
      if (location[0] === 'A') {
        // new row starts

        if (currentRow.length !== 0) {
          result.push(currentRow);
          // reset currentRow
          currentRow = [];
          // add first value
          currentRow.push(value);
        } else {
          currentRow.push(value);
        }
      } else {
        currentRow.push(value);
      }
    }
  }

  // push last row
  result.push(currentRow);
  return result;
};

// gets random number between a min-max
export const randomNumber = (max, min = 0) => {
  // max is exclusive
  return Math.floor(Math.random() * (max - min)) + min;
};
