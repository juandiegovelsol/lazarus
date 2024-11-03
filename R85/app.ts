import * as cheerio from 'cheerio';

interface TextExtractorResult {
  paragraphs: string[];
  headings: {
    h1: string[];
    h2: string[];
    h3: string[];
    h4: string[];
    h5: string[];
    h6: string[];
  };
  divs: string[];
}

/**
 * Extracts text content from an HTML page and returns it in a structured JSON object.
 * 
 * @param html The HTML content to extract text from.
 * @returns A JSON object containing the extracted text content.
 */
function extractText(html: string): TextExtractorResult {
  const $ = cheerio.load(html);
  const result: TextExtractorResult = {
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
  $('p').each((index, element) => {
    result.paragraphs.push($(element).text().trim());
  });

  // Extract text from <h1> to <h6> tags
  for (let i = 1; i <= 6; i++) {
    $(`h${i}`).each((index, element) => {
      result.headings[`h${i}`].push($(element).text().trim());
    });
  }

  // Extract text from <div> tags
  $('div').each((index, element) => {
    result.divs.push($(element).text().trim());
  });

  return result;
}

// Example usage:
const html = `
  <html>
    <body>
      <h1>Main Heading</h1>
      <p>This is a paragraph.</p>
      <div>This is a div.</div>
      <h2>Subheading</h2>
      <p>This is another paragraph.</p>
    </body>
  </html>
`;

const extractedText = extractText(html);
console.log(extractedText);