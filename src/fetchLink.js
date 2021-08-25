import got from "got";
import { load } from "cheerio";
import { writeFile } from "fs";
import extractMcq from "./test.js";

const extractLinks = async (url) => {
  try {
    const response = await got(url);
    const html = response.body;
    const links = [];
    let contents = [];
    const $ = load(html);
    $(".grid-33 ul").each(function () {
      let main = $(this).prev().text();
      let content = $(this).text().trim().split("\n");
      let final_content = [];
      let final_title = [];
      for (let i = 0; i < content.length; i++) {
        if (content[i].length > 0 && content[i].includes("1000")) {
          final_content.push(content[i]);
        }
      }
      if (final_content.length > 1) {
        contents.push({
          Title: main,
          content: final_content,
        });
      }
    });
    $(".grid-33 a").each(function () {
      let link = $(this).attr("href");
      let title = $(this).text();
      let done = false;
      let Main;
      for (let i = 0; i < contents.length; i++) {
        if (done) break;
        if (contents[i].content.includes(title)) {
          Main = contents[i].Title;
          done = true;
        }
      }

      // console.log(found);
      if (link && link.includes("1000") && !link.includes("problems")) {
        links.push({
          Category: Main,
          Title: title,
          Link: link,
        });
      }

      // links.push(link);
    });
    return links;
  } catch (error) {
    console.log(error);
  }
};
extractLinks("https://www.sanfoundry.com/").then(async (links) => {
  for (let i = 0; i < links.length; i++) {
    await extractMcq(links[i].Link);
  }
  writeFile(
    "./saved/links.json",
    JSON.stringify(links, null, 4),
    function (err) {
      if (err) throw err;
      console.log("Saved JSON!");
    }
  );
  writeFile(
    "./saved/contents.json",
    JSON.stringify(contents, null, 4),
    function (err) {
      if (err) throw err;
      console.log("Saved JSON!");
    }
  );
});
// let links = extractLinks("https://www.sanfoundry.com/");
// console.log(extractLinks("https://www.sanfoundry.com/"));
