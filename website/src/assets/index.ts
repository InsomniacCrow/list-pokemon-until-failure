import pokeball from "./pokeball.png";

var idImageMapping: {
  [index: string]: string;
} = {};

// Mapping from id to full image location
const gallery = Object.keys(
  import.meta.glob("@assets/pkmn_images/*.{png,jpg,jpeg,PNG,JPEG}", {
    eager: true,
    query: "?url",
  }),
);

for (const entry of gallery) {
  // get only image
  const imageName = entry.split("/").pop();
  if (imageName) {
    idImageMapping[imageName] = entry;
  }
}

export { idImageMapping, pokeball };
