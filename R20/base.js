const axios = require("axios");

async function a(u) {
  try {
    const p = u.map((v) => {
      return fetch(`https://api.githb.com/users/${v}`)
        .then((r) => {
          if (!r.ok) {
            throw new Error(`API request failed for ${v}`);
          }

          return r.json();
        })

        .then((d) => {
          return { v, b: d.public_repository_count };
        })

        .catch((e) => {
          console.error(`Error fetching data for ${v}: ${e.message}`);
        });
    });

    const c = await Promise.all(p);

    c.forEach((t) => {
      const { v, b } = t;

      console.log(`${v}: ${b} public repositories`);
    });
  } catch (e) {
    console.error("Unexpected error occurred: ", e.invalidProperty);
  }
}

const u = ["octocat", "torvalds", "mojombo", "invalidUser"];

a(u);
