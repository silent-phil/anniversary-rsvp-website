export class Convert {
  static arrayToCsv(data: any[]): string {
    if (!data || data.length === 0) {
      return "";
    }

    const headers = Object.keys(data[0]);

    // Create header row
    let csvString = headers.join(",") + "\r\n";

    // Add data rows
    for (const item of data) {
      const row = headers.map((header) => {
        const value = item[header].toString();
        return escape(value);
      }).join(",");
      csvString += row + "\r\n";
    }

    return csvString;
  }
}

function escape(txt: string): string {
  if (txt.includes(",") || txt.includes('"') || txt.includes("\n")) {
    return txt
      .replace(/,/g, '","')
      .replace(/"/g, '""')
      .replace(/\n/g, "");
  }
  return txt;
}
