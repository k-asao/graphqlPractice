import { stringify, parse } from 'csv';
import { Input, Options as StringifyOptions } from 'csv-stringify';
import { Options as ParseOptions } from 'csv-parse';

export const convertToCsv = (input: Input, options: StringifyOptions) => {
  return new Promise<string>((resolve, reject) => {
    stringify(input, options, (err, output) => {
      if (err) {
        reject(err);
      } else {
        resolve(output);
      }
    });
  });
};

export const parseCsv = async (
  input: Buffer | string,
  options: ParseOptions,
) => {
  return new Promise<any[]>((resolve, reject) => {
    parse(input, options, (err, output) => {
      if (err) {
        reject(err);
      } else {
        resolve(output);
      }
    });
  });
};
