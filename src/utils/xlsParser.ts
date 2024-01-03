import xlsx from "xlsx";

export function parse(xlsFile: Buffer) {
  const workbook = xlsx.read(xlsFile,  { raw: true });
  const { SheetNames } = workbook.Props;

  const array: Array<unknown> = [];
  for(const sheetName of SheetNames) {
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    array.push(...data);
  }

  return array;
}