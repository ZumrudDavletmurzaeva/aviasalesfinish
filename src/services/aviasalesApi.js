export const getSearchId = async () => {
  const response = await fetch('https://front-test.beta.aviasales.ru/search');
  return response.json();
};

export const getData = async (searchId) => {
  const response = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`);
  if (!response.ok) {
    return [];
  }
  const jsonResponse = await response.json();
  return jsonResponse;
};
