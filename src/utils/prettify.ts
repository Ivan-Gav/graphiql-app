const addTabs = (str: string, count: number, space: string) => {
  let row = str.trim();

  for (let i = 0; i < count; i++) {
    if (row !== '') row = space + row;
  }
  row += '\n';

  return row;
};

export const prettify = (str: string) => {
  const arr = [];
  let count = 0;
  let row = '';
  let inParentheses = false;
  const space = '  ';
  let isTab = false;

  str += '\n';

  for (let i = 0; i < str.length; i++) {
    const el = str[i];

    row += el;
    if (el.includes('}') && !inParentheses) {
      count--;
    } else if (el.includes('{') && !inParentheses) {
      isTab = true;
    } else if (el.includes('\n')) {
      const finalRow = addTabs(row, count, space);
      if (finalRow !== '' && finalRow !== '\n') arr.push(finalRow);
      if (isTab) count++;
      isTab = false;
      row = '';
    }

    if (el.includes(')')) {
      inParentheses = false;
    } else if (el.includes('(')) {
      inParentheses = true;
    }
  }
  return arr.join('');
};
