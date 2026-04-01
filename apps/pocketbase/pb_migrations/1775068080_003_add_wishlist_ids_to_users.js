/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("users");

  const existing = collection.fields.getByName("wishlist_ids");
  if (existing) {
    if (existing.type === "json") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("wishlist_ids"); // exists with wrong type, remove first
  }

  collection.fields.add(new JSONField({
    name: "wishlist_ids"
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("users");
  collection.fields.removeByName("wishlist_ids");
  return app.save(collection);
})
