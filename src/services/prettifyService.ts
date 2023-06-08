const prettify = (value: string) => {
  return addIndents(formatNewlineAndSpaces(removeExtraSpaces(removeNewline(value)))).trim();
};

const removeNewline = (value: string) => {
  return value.replaceAll('\n', ' ');
};

const removeExtraSpaces = (value: string) => {
  return value.replace(/\s+/g, ' ');
};

const formatNewlineAndSpaces = (value: string) => {
  let result = '';
  for (let i = 0; i < value.length; i++) {
    if (value[i] === '{') {
      if (value[i - 1] && value[i - 1] !== ' ') result += ' ';
      result += `${value[i]}\n`;
      continue;
    }
    if (value[i] === '}') {
      result += `\n${value[i]}`;
      if (
        value[i + 1] &&
        (value[i + 1].match(/[A-Za-z]/) ||
          (value[i + 1] === ' ' && value[i + 2] && value[i + 2].match(/[A-Za-z]/)))
      )
        result += '\n';
      continue;
    }
    if (
      value[i - 1] &&
      value[i - 1].match(/[A-Za-z]/) &&
      value[i] === ' ' &&
      value[i + 1].match(/[A-Za-z]/) &&
      result.includes('{')
    ) {
      result += '\n';
      continue;
    }
    if (value[i] === '\n' && value[i + 1].match(/[A-Za-z]/)) continue;
    result += value[i];
  }
  return result;
};

const addIndents = (value: string) => {
  const indentSize = 2;
  let indentCount = 0;
  let result = '';
  const valueArray = value.split('\n');
  for (let i = 0; i < valueArray.length; i++) {
    if (valueArray[i].includes('}')) indentCount--;
    result += ' '.repeat(indentCount * indentSize) + valueArray[i].trim() + '\n';
    if (valueArray[i].includes('{')) indentCount++;
  }
  return result;
};

export default prettify;
