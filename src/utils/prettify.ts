const addSpaces = (str: string, count: number, space: string) => {
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

  for (let i = 0; i < str.length; i++) {
    const el = str[i];
    if (el === '\n' || el === ' ') continue;
    if (el === '}' && !inParentheses) {
      row = addSpaces(row, count, space);
      if (row !== '\n') arr.push(row);
      row = '';

      count--;
      row += el;
      arr.push(addSpaces(row, count, space));
      row = '';
    } else {
      if (el === ')') {
        inParentheses = false;
        row += el;
      } else if (el === '(') {
        inParentheses = true;
        row += el;
      } else if (el === ',') {
        row += el + ' ';
      } else if (el === '{') {
        if (inParentheses) {
          row += el + ' ';
        } else {
          row += ' ' + el;
        }
      } else if (el === '}' && inParentheses) {
        row += ' ' + el;
      } else if (el === ':') {
        row += el + ' ';
      } else row += el;
    }
    if (el === '{' && !inParentheses) {
      arr.push(addSpaces(row, count, space));
      count++;
      row = '';
    }
  }
  return arr.join('');
};
