const path = require("path");
const fs = require("fs");
const express = require("express");
const https = require("https");
const PORT = process.env.PORT || 8080;
const app = express();
const router = express.Router();

const defaultRoute = (req, res) => {
  const {
    title = "Postcard - Personal Travel Organiser",
    description = "The easiest way to build &amp; organise your travel bucket-lists.",
    imageURL = "https://postcard.travel/assets/images/HomePage/theme_1.png"
  } = req.params;

  fs.readFile(
    path.resolve(__dirname, "..", "build/index.html"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send("An error occurred");
      }

      data = data
        .replace(/__TITLE__/g, title)
        .replace(/__DESCRIPTION__/g, description)
        .replace(/__URL__/g, `https://postcard.travel${req.path}`)
        .replace(/__IMAGE__/g, imageURL);

      res.send(data);
    }
  );
};

const serverRenderer = (req, _, next) => {
  const { id } = req.params;

  const options = {
    hostname: "proconnect.postcard.travel",
    path: `/Stories/?id=${id}`,
    method: "GET",
    JSON: true
  };

  const apiReq = https.request(options, (res) => {

    let dataStr = "";
    res.on("data", (data) => (dataStr = `${dataStr}${data}`));

    res.on("end", () => {
      const jsonRes = JSON.parse(dataStr);

      if (jsonRes.length > 0) {
        const { title, description, imageURL } = jsonRes[0];
        req.params = {
          ...req.params,
          title,
          description,
          imageURL
        };
      }
      next();
    });
  });

  apiReq.on("error", (error) => {
    console.error(error);
    next();
  });

  apiReq.end();
};

router.get("/", defaultRoute);
router.get("/search", defaultRoute);
router.get("/travel-guide", defaultRoute);

router.get("/collections/explore/:id", serverRenderer, defaultRoute);

router.use(express.static(path.resolve(__dirname, "..", "build")));

app.use(router);

app.listen(PORT, () => {
  // console.log(`Postcard-web-server running on port ${PORT}`);
});
