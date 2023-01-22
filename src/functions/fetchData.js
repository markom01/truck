export default async function fetchData({
  params = {},
  data,
  setIsLoading,
  setIsRefetching,
  setIsError,
}) {
  if (!data.length) {
    setIsLoading(true);
  } else {
    setIsRefetching(true);
  }
  const url = new URL("/markom01/truck/posts", "https://mockend.com");

  // iterate through params object and append to url
  Object.keys(params).forEach((key) => {
    if (params[key] !== "All") {
      url.searchParams.append(key, params[key]);
    }
  });

  // console.log(url.href);

  try {
    const response = await fetch(url.href);

    const json = await response.json();
    return json;
  } catch (error) {
    setIsError(true);

    console.error(error);

    return;
  } finally {
    setIsError(false);

    setIsLoading(false);

    setIsRefetching(false);
  }
}
