# CSS Extractor and Purifier

This project is an Express.js application that extracts and purifies CSS from a given URL. It uses Puppeteer to scrape the HTML and CSS from the webpage, combines the CSS, and purifies it to include only the used styles.

### Features

* Extract HTML and CSS: Scrapes HTML content and CSS files from a specified URL.
* Combine CSS: Merges all CSS files into a single file.
* Purify CSS: Uses PurifyCSS to remove unused CSS and minifies the remaining CSS.
* API Endpoint: Provides a /url endpoint to accept a URL and return purified CSS.

### Technologies Used

* Node.js & Express.js: Backend framework
* Puppeteer: Headless browser for web scraping
* PurifyCSS: Tool for purifying CSS
* Body-Parser & CORS: Middleware for handling JSON requests and enabling cross-origin resource sharing

## Installation

### Clone the repository
```bash
git clone https://github.com/yourusername/css-extractor-purifier.git
cd css-extractor-purifier
```

### Install Dependencies
```bash
npm install
```

### Run the server
```bash
npm start
```

## Usage
Send a GET request to http://localhost:3000/url with a JSON body containing the URL you want to process.

### Example
```bash
curl -X GET http://localhost:3000/url -d '{"url": "https://example.com"}' -H "Content-Type: application/json"
```
The purified CSS will be saved in used.css and can be accessed via the response.
