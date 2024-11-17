export const isValidImageUrl = async (url) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    const contentType = response.headers.get("content-type");
    return !!contentType?.startsWith("image/");
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return false;
  }
};
