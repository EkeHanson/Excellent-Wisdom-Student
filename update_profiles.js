const fs = require("fs");
const names = require("./src/names.js").names;
const data = require("./src/data.js");
const profiles = data.classmateProfiles;

function normalize(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function findSimilarProfile(name, profiles) {
  const normName = normalize(name);
  const words = name.split(" ");

  for (const [key, value] of Object.entries(profiles)) {
    if (key === name) return key;
    const normKey = normalize(key);
    if (normName === normKey) return key;
    if (normName.includes(normKey) || normKey.includes(normName)) return key;

    const keyWords = key.split(" ");
    if (words.length === keyWords.length) {
      const sortedWords = [...words].sort().join(" ");
      const sortedKeyWords = [...keyWords].sort().join(" ");
      if (sortedWords === sortedKeyWords) return key;
    }
  }
  return null;
}

const newProfiles = {};
for (const name of names) {
  if (profiles[name]) {
    newProfiles[name] = profiles[name];
    continue;
  }

  const similar = findSimilarProfile(name, profiles);
  if (similar) {
    newProfiles[name] = { ...profiles[similar] };
  } else {
    newProfiles[name] = {
      occupation: "Alumni member",
      facts: ["Active member of the alumni association."],
      phone: "",
      email: "",
    };
  }
}

for (const [key, value] of Object.entries(profiles)) {
  if (!newProfiles[key]) {
    newProfiles[key] = value;
  }
}

console.log("New total profiles:", Object.keys(newProfiles).length);

const entries = Object.entries(newProfiles);
let profilesText = "export const classmateProfiles = {\n";
for (const [key, value] of entries) {
  const json = JSON.stringify(value, null, 2);
  const indented = json
    .split("\n")
    .map((line, i) => (i === 0 ? line : "    " + line))
    .join("\n");
  profilesText += `  '${key}': ${indented},\n`;
}
profilesText += "}";

const dataPath = "./src/data.js";
let content = fs.readFileSync(dataPath, "utf8");

const startMarker = "export const classmateProfiles = {";
const startIndex = content.indexOf(startMarker);
if (startIndex === -1) {
  console.error("Could not find classmateProfiles start");
  process.exit(1);
}

let braceCount = 0;
let endIndex = startIndex;
for (let i = startIndex; i < content.length; i++) {
  if (content[i] === "{") braceCount++;
  if (content[i] === "}") braceCount--;
  if (braceCount === 0) {
    endIndex = i;
    break;
  }
}

const newContent = content.substring(0, startIndex) + profilesText + content.substring(endIndex + 1);
fs.writeFileSync(dataPath, newContent);
console.log("Updated data.js successfully");
