# Whereabouts Data Generator

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

Normalizing will `normalized.json` file inside `output` folder.
Its content is almost identical as `data.json` but it has a few differences.
For example field names or object structures may change.
Overall it's just a simple map that cleans up data a little bit.

1. Run `npm run normalize`.

### Scraping

Scraping will gather additional content from the website.

It will generate a dedicated file for each attraction inside `output/scraped` folder.
This way if some error happens in the middle of the scraping, previous results will be safe.
Also, if you run scrape script again, attractions that are already scraped, won't be scraped again.

It's necessary to run normalize script before scraping,
because scrapers read id and url from `normalized.json` file.

1. Run `npm run scrape`.

### Simple Mock API

1. Run `npm run db`.
2. Visit `http://localhost:3000/`
