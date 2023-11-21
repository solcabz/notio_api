// async function displayDataOnWebpage() {
//   try {
//     const response = await fetch('/api/database'); // Fetch data from the server
//     const { data } = await response.json();

//     const dataContainer = document.getElementById('data-container');
//     dataContainer.innerHTML = ''; // Clear previous content

//     data.forEach((page) => {
//       const pageDiv = document.createElement('div');
//       pageDiv.classList.add('data-card'); // Add the 'data-card' class
//       pageDiv.innerHTML = `
//         <p>Name: ${page.properties.Name.title[0].text.content}</p>
//         <p>Created Time: ${page.properties.Created_time.created_time}</p>
//         <p>Last Edited By: ${page.properties.Created_by.created_by.id}</p>
//         <p>Sample Text: ${page.properties.sample1.rich_text[0].text.content}</p>
//         <p>Sample Text: ${page.properties.sample1.rich_text[0].text.content}</p>
//         <p>Sample Text: ${page.properties.sample1.rich_text[0].text.content}</p>
//         <p>Sample Text: ${page.properties.sample1.rich_text[0].text.content}</p>
//         <p>Sample Text: ${page.properties.sample1.rich_text[0].text.content}</p>
//         <p>Sample Text: ${page.properties.sample1.rich_text[0].text.content}</p>
//         <!-- Add other properties as needed -->
//       `;
//       dataContainer.appendChild(pageDiv);
//     });
//   } catch (error) {
//     console.error("Error displaying data:", error);
//   }
// }

// displayDataOnWebpage();

async function displayDataOnWebpage() {
  try {
    const response = await fetch('/api/database'); // Fetch data from the server
    const { data } = await response.json();

    const groupedData = {}; // Group data by date
    data.forEach((page) => {
      const createdTime = new Date(page.properties.Created_time.created_time);
      const date = createdTime.toDateString(); // Extract date
      const time = createdTime.toLocaleTimeString(); // Extract time

      if (!groupedData[date]) {
        groupedData[date] = [];
      }

      groupedData[date].push({ time, page });
    });

    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = ''; // Clear previous content

    for (const date in groupedData) {
      if (Object.hasOwnProperty.call(groupedData, date)) {
        const entries = groupedData[date];

        const dateDiv = document.createElement('div');
        dateDiv.classList.add('date-card'); // Add class for the date card

        const dateHeading = document.createElement('h2');
        dateHeading.textContent = `Date: ${date}`;
        dateDiv.appendChild(dateHeading);

        entries.forEach((entry) => {
          const { time, page } = entry;
          const pageDiv = document.createElement('div');
          
          pageDiv.classList.add('data-card'); // Add the 'data-card' class
          pageDiv.innerHTML = `
            <p>Name: ${page.properties.Name.title[0].text.content}</p>
            <p>Created Time: ${time}</p>
            <p>Last Edited By: ${page.properties.Created_by.created_by.id}</p>
            <p>Sample Text: ${page.properties.sample1.rich_text[0].text.content}</p>
            <!-- Add other properties as needed -->
          `;
          dateDiv.appendChild(pageDiv);
        });

        dataContainer.appendChild(dateDiv);
      }
    }
  } catch (error) {
    console.error("Error displaying data:", error);
  }
}

displayDataOnWebpage();
