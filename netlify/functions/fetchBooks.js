fetch("https://your-site.netlify.app/.netlify/functions/fetchBooks")
  .then(res => res.json())
  .then(data => {
    // render into your table
  });
