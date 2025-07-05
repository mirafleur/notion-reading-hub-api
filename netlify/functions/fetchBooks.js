const fetch = require("node-fetch");

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

  const raw = await response.json();

  const cleaned = raw.results.map(page => {
    const props = page.properties;

    return {
      id: page.id,
      title: props.Name?.title?.[0]?.plain_text ?? "Untitled",
      author: props.Authors?.rich_text?.[0]?.plain_text ?? "Unknown",
      status: props.Status?.select?.name ?? "Unknown",
      rating: props.Rating?.number ?? null,
      pages: props.Pages?.number ?? null,
      genres: props.Genres?.multi_select?.map(g => g.name) ?? [],
      dateStarted: props["Date Started"]?.date?.start ?? null,
      dateFinished: props["Date Finished"]?.date?.start ?? null
    };
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ books: cleaned })
  };
};
