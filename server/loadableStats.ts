import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);

async function loadableStats(): Promise<Record<string, any>> {
  if (process.env.NODE_ENV === 'development') {
    // In development path.resolve(__dirname, '../dist/loadable-stats.json') will fail,
    // because webpack writes the file in memory
    console.debug(`Using loadable-assets.json from: http://localhost:${process.env.PORT}/loadable-stats.json`);
    const { data } = await axios.get(`http://localhost:${process.env.PORT}/loadable-stats.json`);
    return data;
  }

  const data = await readFile(path.resolve(__dirname, '../dist/loadable-stats.json'), 'utf-8');
  return JSON.parse(data);
}

export default loadableStats;
