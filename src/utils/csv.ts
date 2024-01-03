import * as csvStringify from "csv-stringify";

export function toStream(data: object, delimiter = ",") {
  const stream = csvStringify.stringify({ delimiter, header: true });

  if(Array.isArray(data)) {
    for(const item of data) {
      stream.write(item);
    }
  } else {
    stream.write(data);
  }

  stream.end();
  
  return stream;
}

export async function toString(stringify: csvStringify.Stringifier) {
  const data: unknown[] = [];
  for await (const chunk of stringify ) {
    data.push(chunk);
  }

  return data.join();
}