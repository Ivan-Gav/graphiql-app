const addTabs = (str: string, count: number, space: string) => {
  let row = str.trim();
  for (let i = 0; i < count; i++) {
    if (row !== '') row = space + row;
  }
  row += '\n';

  return row;
};

const addSpaces = (el: string, inParentheses: boolean) => {
  let newEl = el;
  switch (el) {
    case '}':
      if (inParentheses) {
        newEl = ' ' + el;
      }
      break;
    case '{':
      if (inParentheses) {
        newEl = el + ' ';
      } else {
        newEl = ' ' + el;
      }
      break;
    case '(':
      break;
    case ')':
      break;
    case ':':
      newEl = el + ' ';
      break;
    case ',':
      newEl = el + ' ';
      break;
    default:
      break;
  }
  return newEl;
};

export const prettify = (str: string) => {
  const arr = [];
  let count = 0;
  let row = '';
  let inParentheses = false;
  const space = '  ';

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '\n' || str[i] === ' ') continue;
    const el = addSpaces(str[i], inParentheses);

    if (el.includes('}')) {
      if (!inParentheses) {
        row = addTabs(row, count, space);
        if (row !== '\n') arr.push(row);
        row = '';

        row += el;
        count--;
        arr.push(addTabs(row, count, space));
        row = '';
      } else {
        row += el;
      }
    } else {
      row += el;
    }

    if (el.includes('{') && !inParentheses) {
      arr.push(addTabs(row, count, space));
      count++;
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
