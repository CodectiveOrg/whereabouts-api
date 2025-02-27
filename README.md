# Whereabouts API

## How to use?

### Setup

1. Clone this repository.
2. Run `npm install`.

### Gathering Initial Data

1. Visit [this link](https://www.kojaro.com/attraction/list/%D8%AA%D9%87%D8%B1%D8%A7%D9%86-118-ci/).
2. Open DevTools and go to network tab.
3. Refresh the page so you can see the requests.
4. Filter requests by `fetch/xhr`.
5. There should be a request which name starts with `filter/?`
6. Open the request and go to preview tab.
7. Expand `result` field and right-click on `directories` and select `Copy object`.
8. Create a `data.json` file inside `input` folder.
9. Add copied object to `data.json`.

### Normalizing

Normalizing will `db.json` file inside `output` folder.
Its content is almost identical as `data.json` but it has a few differences.
For example field names or object structures may change.
Overall it's just a simple map that cleans up data a little bit.

1. Run `npm run normalize`.
2. Run `npm run db`.
3. Visit `http://localhost:3000/`

### Scraping

Scraping will put additional content to the normalized data.
So its necessary to run normalize script before scraping.

The scrape data can be used in PDP.

1. Run `npm run scrape`.
