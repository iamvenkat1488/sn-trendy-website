/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_5037720684"); // products collection

  const existing = collection.fields.getByName("tags");
  if (existing) {
    return; // field already exists, skip
  }

  collection.fields.add(new SelectField({
    name: "tags",
    maxSelect: 5,
    values: ["New Arrival", "Trending", "Best Seller", "Sale", "Featured"]
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_5037720684");
  collection.fields.removeByName("tags");
  return app.save(collection);
})
