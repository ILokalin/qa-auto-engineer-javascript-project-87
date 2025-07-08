// @ts-check
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8').trim();
const getDiffPath = (format) => `diff_${format}.txt`;

const plainResult = readFile(getDiffPath('plain'));
const stylishResult = readFile(getDiffPath('stylish'));
const jsonResult = readFile(getDiffPath('json'));

describe('should be work with json format', () => {
  it('genDiff json', () => {
    const filepath1 = getFixturePath('file_1.json');
    const filepath2 = getFixturePath('file_2.json');

    expect(genDiff(filepath1, filepath2)).toBe(stylishResult);
    expect(genDiff(filepath1, filepath2, 'stylish')).toBe(stylishResult);
    expect(genDiff(filepath1, filepath2, 'plain')).toBe(plainResult);
    expect(genDiff(filepath1, filepath2, 'json')).toBe(jsonResult);
  });

  it('genDiff yml', () => {
    const filepath1 = getFixturePath('file_1.yml');
    const filepath2 = getFixturePath('file_2.yml');

    expect(genDiff(filepath1, filepath2)).toBe(stylishResult);
    expect(genDiff(filepath1, filepath2, 'stylish')).toBe(stylishResult);
    expect(genDiff(filepath1, filepath2, 'plain')).toBe(plainResult);
    expect(genDiff(filepath1, filepath2, 'json')).toBe(jsonResult);
  });
});
