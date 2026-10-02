import { execSync } from 'child_process';

const urls = [
  'https://raw.githubusercontent.com/theapache64/top-250-movies/master/top-250-indian-movies.json',
  'https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json',
  'https://raw.githubusercontent.com/vega/vega-datasets/master/data/movies.json'
];

for (const u of urls) {
  try {
    const res = execSync(`curl.exe -I -s -L "${u}"`, { timeout: 10000 }).toString();
    console.log(u, '-->', res.split('\r\n')[0] || res.split('\n')[0]);
  } catch (e) {
    console.log(u, '--> ERROR:', e.message);
  }
}
