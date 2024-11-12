"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio = require("cheerio");
/**
 * Extracts text content from an HTML page and returns it in a structured JSON object.
 *
 * @param html The HTML content to extract text from.
 * @returns A JSON object containing the extracted text content.
 */
function extractText(html) {
    var $ = cheerio.load(html);
    var result = {
        paragraphs: [],
        headings: {
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
        },
        divs: [],
    };
    // Extract text from <p> tags
    $('p').each(function (index, element) {
        result.paragraphs.push($(element).text().trim());
    });
    var _loop_1 = function (i) {
        $("h".concat(i)).each(function (index, element) {
            result.headings["h".concat(i)].push($(element).text().trim());
        });
    };
    // Extract text from <h1> to <h6> tags
    for (var i = 1; i <= 6; i++) {
        _loop_1(i);
    }
    // Extract text from <div> tags
    $('div').each(function (index, element) {
        result.divs.push($(element).text().trim());
    });
    return result;
}
// Example usage:
var html = "\n  <html>\n    <body>\n      <h1>Main Heading</h1>\n      <p>This is a paragraph.</p>\n      <div>This is a div.</div>\n      <h2>Subheading</h2>\n      <p>This is another paragraph.</p>\n    </body>\n  </html>\n";
var extractedText = extractText(html);
console.log(extractedText);
