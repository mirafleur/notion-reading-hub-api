// netlify/functions/fetchBooks.js

exports.handler = async function(event, context) {
  const NOTION_SECRET = process.env.NOTION_SECRET;
  const DATABASE_ID = process.env.NOTION_DATABASE_ID;

  const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NOTION_SECRET}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ page_size: 100 })
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
