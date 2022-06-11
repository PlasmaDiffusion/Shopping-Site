export function getClientUrl() {
  return process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : "https://shopping-site-mockup.netlify.app/";
}

export function getServerUrl() {
  if (process.env.NODE_ENV == "development") return "http://localhost:4000";
  else if (process.env.NODE_ENV == "test") return "";
  else return "https://shopping-mockup.herokuapp.com";
}
