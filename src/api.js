const express = require("express");
const serverless =  require("serverless-http");
const app = express();
const router = express.Router();
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/dist"));

const port = process.env.PORT || 3000;
const server = app.listen(port, function () {
  console.log("server is listening on port " + port);
});

router.get("/", (req, res) => {
  res.sendFile("index.html");
});

const io = require("socket.io")(server);

// hardcoded keywords
const keywordList = [
  {
    keyword: "CP",
    msg: "I have participated in many coding events. solved more than 800 problems on different platform. I have also participated in many coding contest and secured a decent score. For more info please refer my resume.",
    link: "https://drive.google.com/file/d/1WnFnBrtICw5u-upIAYfwl3PblsI6RJMd/view",
  },
  {
    keyword: "cp",
    msg: "I have participated in many coding events. solved more than 800 problems on different platform. I have also participated in many coding contest and secured a decent score. For more info please refer my resume.",
    link: "https://drive.google.com/file/d/1WnFnBrtICw5u-upIAYfwl3PblsI6RJMd/view",
  },
  
  {
    keyword: "internships",
    msg: "My latest internship was in LD College of Engineering where the college student section portal which handled certificate management and student verification. In 2021 summer i got internship in brainy beam technology where i learned and worked on django and used different python libraries for backend.",
    link: "https://drive.google.com/file/d/1WnFnBrtICw5u-upIAYfwl3PblsI6RJMd/view",
  },
  {
    keyword: "project",
    msg: "I have developed many project like Stock Portfolio Manager, Blog page using Strapi and Next js, Real time chat application. In that I used Socket . io, React and Chakra UI",
    link: "https://github.com/vaibhav720",
  },
  {
    keyword: "projects",
    msg: "I have developed many project like Stock Portfolio Manager, Blog page using Strapi and Next js, Real time chat application. In that I used Socket . io, React and Chakra UI",
    link: "https://github.com/vaibhav720",
  },
  {
    keyword: "get connected",
    msg: "This is my LinkedIn profile. Pleasure to connect with you.",
    link: "https://www.linkedin.com/in/vaibhav-parikh-9b13b61a3/",
  },
];

io.on("connection", function (socket) {
  socket.on("user message", (text) => {
    keywordList.forEach(({ keyword, msg, link }) => {
      if (text.includes(keyword)) {
        socket.emit("bot message", { msg, link });
      }
    });
  });
});

app.use("/.netlify/functions/api",router);