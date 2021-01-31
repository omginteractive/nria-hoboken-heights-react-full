const flypilotFetchWPRestAPI = async (endpoint) => {
  const rest_response = await fetch(endpoint);
	const rest_data = await rest_response.json();
  return rest_data
}

export default flypilotFetchWPRestAPI;