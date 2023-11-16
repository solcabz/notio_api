async function displayDataOnWebpage() {
  try {
    const response = await fetch('/api/database'); // Fetch data from the server
    const { data } = await response.json();

    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = ''; // Clear previous content

    data.forEach((page) => {
      const pageDiv = document.createElement('div');
      pageDiv.classList.add('data-card'); // Add the 'data-card' class
      pageDiv.innerHTML = `
        <p>Name: ${page.properties.Name.title[0].text.content}</p>
        <p>Created Time: ${page.properties.Created_time.created_time}</p>
        <p>Last Edited By: ${page.properties.Created_by.created_by.id}</p>
        <p>Sample Text: ${page.properties.sample1.rich_text[0].text.content}</p>
        <!-- Add other properties as needed -->
      `;
      dataContainer.appendChild(pageDiv);
    });
  } catch (error) {
    console.error("Error displaying data:", error);
  }
}

displayDataOnWebpage();

//sample