const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function getDatabase() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      sorts: [
        {
          property: 'Name',
          direction: 'ascending',
        },
      ],
    });
    return response.results; // Return the array of pages
  } catch (error) {
    throw new Error(`Error fetching database: ${error.message}`);
  }
}

module.exports = { getDatabase };
