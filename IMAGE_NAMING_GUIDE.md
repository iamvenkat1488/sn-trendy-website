# 📸 Image Naming Cheat Sheet

## Quick Reference

```
┌─────────────────────────────────────────────────────────┐
│  FILENAME FORMAT: category-name-price.jpg               │
└─────────────────────────────────────────────────────────┘

┌──────────────┬──────────────────┬─────────────────────┐
│  Category    │  Example         │  Result             │
├──────────────┼──────────────────┼─────────────────────┤
│  saree       │  saree-red-2999  │  Red Saree, ₹2999   │
│  kurti       │  kurti-blue-899  │  Blue Kurti, ₹899   │
│  lehenga     │  lehenga-pink-4999│ Pink Lehenga, ₹4999│
│  dress       │  dress-green-1499│  Green Dress, ₹1499 │
│  daily       │  daily-white-599 │  White Daily, ₹599  │
└──────────────┴──────────────────┴─────────────────────┘
```

---

## Categories

| Type | Use in filename |
|------|-----------------|
| Sarees | `saree` or `sarees` |
| Kurtis | `kurti` or `kurtis` |
| Lehengas | `lehenga` or `lehengas` |
| Western Dresses | `dress` or `western` |
| Daily Wear | `daily` or `dailywear` |

---

## Multiple Images

Same product, multiple angles:

```
saree-red-silk-2999.jpg       ← Main image
saree-red-silk-2999-2.jpg     ← Second angle
saree-red-silk-2999-3.jpg     ← Third angle
```

All 3 images → 1 product with 3 photos!

---

## Auto-Detected Colors

Include color in name, system detects it:

- red, blue, green, yellow, pink
- black, white, purple, orange, brown
- grey, maroon, navy, golden, silver
- beige, cream

Example: `saree-red-silk-2999.jpg` → Color: Red ✅

---

## Workflow

```
1. Take photos → 2. Rename files → 3. Push to GitHub → 4. Done!
   📸              category-name-price.jpg    git push        ✅
```

---

## Examples

```bash
# Good ✅
saree-red-silk-2999.jpg
kurti-blue-cotton-899.jpg
lehenga-pink-wedding-4999.jpg
dress-green-party-1499.jpg

# Also works ✅
sarees-red-2999.jpg
kurtis-blue-899.jpg
western-green-1499.jpg

# Bad ❌
IMG_1234.jpg              # No category/name/price
red-saree.jpg             # No price
2999.jpg                  # No category/name
```

---

## Daily Workflow

```bash
# 1. Add images
cp ~/Downloads/*.jpg tools/uploads/images/

# 2. Push to GitHub
git add tools/uploads/images/
git commit -m "Add new products"
git push

# 3. Wait 3 minutes
# 4. Check website ✅
```

---

## That's It!

**No JSON files. No manual data entry. Just images!** 🎉
