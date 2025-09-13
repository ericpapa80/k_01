async function text(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
  return response.text();
}

export default JSON.parse(await text(import.meta.resolve("./test_simple.geojson")));
