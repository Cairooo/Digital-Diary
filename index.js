import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let notes = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { tNotes: notes });
});

app.post("/post", (req, res) => {
  const uNote = req.body["new-note"];
  if (uNote !== "") {
    notes.push(uNote);
  }
  res.render("index.ejs", { userN: uNote, tNotes: notes });
});

app.post("/delete/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (!isNaN(index) && index >= 0 && index < notes.length) {
    notes.splice(index, 1);
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
