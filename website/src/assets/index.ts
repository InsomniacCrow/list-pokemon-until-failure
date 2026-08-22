//const BASE_IMG_PATH = "./../assets/";

var idImageMapping: {
  [index: string]: string;
} = {};

// Mapping from id to full image location
const gallery = Object.values(
  import.meta.glob("@assets/pkmn_images/*.{png,jpg,jpeg,PNG,JPEG}", {
    eager: true,
    as: "url",
  }),
);

for (const entry of gallery) {
  // get only image
  const imageName = entry.split("/").pop();
  if (imageName) {
    idImageMapping[imageName] = entry;
  }
}

export { idImageMapping };
