const BASE_URL = "http://192.168.137.1:3000";

export const cardFetch = (path, options = {}) => {
  return fetch(`${BASE_URL}/api${path}`, options)
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      throw new Error("Something went wrong... please try again.");
    })
    .catch(error => {
      // Log to sentry
      console.warn("ERROR: ", `${BASE_URL}/api${path}`, error);

      throw new Error(error);
    });
};
