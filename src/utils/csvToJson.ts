type JSONRow = { [key: string]: string };

export function csvToJson(csvString: string): JSONRow[] {
  const lines = csvString.trim().split("\n");
  const headers = lines[0].split(",");
  const jsonArr: JSONRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i].split(",");
    const jsonObj: JSONRow = {};
    for (let j = 0; j < headers.length; j++) {
      jsonObj[headers[j]] = currentLine[j];
    }
    jsonArr.push(jsonObj);
  }

  return jsonArr;
}
