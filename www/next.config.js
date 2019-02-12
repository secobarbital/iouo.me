module.exports = {
  env: {
    COUCHDB_NAME: process.env.COUCHDB_NAME || "iouome",
    COUCHDB_URL_READONLY: process.env.COUCHDB_URL_READONLY || "http://localhost:5984"
  },
  target: "serverless"
};
