try {
  // Parse the original JSON response body
  let parsedBody = JSON.parse($response.body);

  // Check if 'data' array exists
  if (parsedBody.data && Array.isArray(parsedBody.data)) {
    // Filter the 'data' array to exclude the item where barName is "视频"
    parsedBody.data = parsedBody.data.filter(item => item.barName !== "视频");
  }

  $done({ body: JSON.stringify(parsedBody) });

} catch (error) {
  // If there's an error during parsing or modification (e.g., the response wasn't valid JSON),
  // log the error and potentially return an unmodified or error response.
  console.log(`Error modifying response body: ${error}`);
  
  // Fallback: pass through the original response body if an error occurs.
  $done({}); 
}