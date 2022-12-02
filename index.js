const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

const port = process.env.PORT || 3000;
const server = app.listen(port, function () {
  console.log("server is listening on port " + port);
});

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

const io = require("socket.io")(server);

// hardcoded keywords
const keywordList = [
  {
    keyword: "CP",
    msg: "I have participated in many coding events. solved more than 800 problems on different platform. ",
    link: "https://leetcode.com/vaib19/",
  },
  {
    keyword: "cp",
    msg: "I have participated in many coding events. solved more than 800 problems on different platform. ",
    link: "https://leetcode.com/vaib19/",
  },
  {
    keyword: "Internships",
    msg: "My latest internship was in LD College of Engineering where ",
    link: "https://www.linkedin.com/safety/go?url=https%3A%2F%2Fdrive.google.com%2Ffile%2Fd%2F1WnFnBrtICw5u-upIAYfwl3PblsI6RJMd%2Fview%3Fusp%3Dsharing&trk=flagship-messaging-web&messageThreadUrn=urn%3Ali%3AmessagingThread%3A2-NTgyZWMwMGMtYjZiZS00NDZiLTgwYTktZTgyMTIyOTRiNzIzXzAxMw%3D%3D&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BpFOFD9mlTPugquCxfZz1UQ%3D%3D",
  },
  {
    keyword: "internships",
    msg: "My latest internship was in LD College of Engineering where ",
    link: "https://zerotomastery.io/career-paths/i-just-want-to-get-hired",
  },
  {
    keyword: "Projects",
    msg: "I have developed many project like Stock Portfolio Manager, Blog page using Strapi and Next js, Real time chat application using Socket.io, React and Chakra UI",
    link: "https://github.com/vaibhav720",
  },
  {
    keyword: "projects",
    msg: "I have developed many project like Stock Portfolio Manager, Blog page using Strapi and Next js, Real time chat application using Socket.io, React and Chakra UI",
    link: "https://github.com/vaibhav720",
  },
  {
    keyword: "Get Connected",
    msg: "This is my LinkedIn profile.",
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
