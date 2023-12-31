require("dotenv").config();

const mysql = require("mysql2/promise");
const VideoManager = require("./VideoManager");
const PhotoManager = require("./PhotoManager");
// create a connection pool to the database

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const database = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

// try a connection

database.getConnection().catch(() => {
  console.warn(
    "Warning:",
    "Failed to get a DB connection.",
    "Did you create a .env file with valid credentials?",
    "Routes using models won't work as intended"
  );
});

// declare and fill models: that's where you should register your own managers

const models = {};
const CatManager = require("./CatManager");
const VideoCatManager = require("./VideoCatManager");
const ViewerManager = require("./ViewerManager");

models.video = new VideoManager();
models.video.setDatabase(database);
models.category = new CatManager();
models.category.setDatabase(database);
models.videoCat = new VideoCatManager();
models.videoCat.setDatabase(database);
models.viewer = new ViewerManager();
models.viewer.setDatabase(database);

models.photo = new PhotoManager();
models.photo.setDatabase(database);

// bonus: use a proxy to personalize error message,
// when asking for a non existing model

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js, and did you register it in backend/src/models/index.js?`
    );
  },
};

module.exports = new Proxy(models, handler);
