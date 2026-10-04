/**
 * Extracts options, types, materials, and sizes for an inventory item.
 */
export function getItemDetails(item) {
  const details = [];

  // Selected types in item.type array
  if (Array.isArray(item.type)) {
    item.type.forEach((t) => {
      if (t.selected && t.option) {
        const opt = t.option.trim();
        if (opt && !details.includes(opt)) {
          details.push(opt);
        }
      }
    });
  }

  // Check childItems if any has selected types or sizes
  if (Array.isArray(item.childItems)) {
    item.childItems.forEach((child) => {
      if (Array.isArray(child.type)) {
        child.type.forEach((t) => {
          if (t.selected && t.option) {
            const opt = t.option.trim();
            if (opt && !details.includes(opt)) {
              details.push(opt);
            }
          }
        });
      }
      if (Array.isArray(child.size)) {
        child.size.forEach((s) => {
          if (s.selected) {
            const sizeLabel = (s.tooltip || s.option || '').trim();
            if (sizeLabel && !details.includes(sizeLabel)) {
              details.push(sizeLabel);
            }
          }
        });
      }
    });
  }

  // Selected sizes in item.size array
  if (Array.isArray(item.size)) {
    item.size.forEach((s) => {
      if (s.selected) {
        const sizeLabel = (s.tooltip || s.option || '').trim();
        if (sizeLabel && !details.includes(sizeLabel)) {
          details.push(sizeLabel);
        }
      }
    });
  }

  // If no selected types or sizes are found, but typeOptions is a single option
  if (details.length === 0 && item.typeOptions && typeof item.typeOptions === 'string') {
    const opts = item.typeOptions.split(',').map((s) => s.trim());
    if (opts.length === 1 && opts[0]) {
      details.push(opts[0]);
    }
  }

  return details.join(', ');
}

/**
 * Parses and groups items from the API response into categories and subcategories
 */
export function parseInventoryData(itemsData) {
  if (!itemsData) return [];

  const categories = [];

  // 1. Process standard inventory categories from items.inventory
  if (Array.isArray(itemsData.inventory)) {
    itemsData.inventory.forEach((inv) => {
      let totalQty = 0;
      const subcategories = [];

      if (Array.isArray(inv.category)) {
        inv.category.forEach((cat) => {
          const rawItems = Array.isArray(cat.items) ? cat.items : [];
          const activeItems = [];

          rawItems.forEach((it) => {
            const qty = Number(it.qty) || 0;
            // Also check if childItems have separate quantities
            if (qty > 0) {
              activeItems.push({
                id: it.id || it.uniquieId || it.name,
                name: it.displayName || it.name || 'Unnamed Item',
                qty,
                details: getItemDetails(it),
              });
            }
          });

          if (activeItems.length > 0) {
            const catQty = activeItems.reduce((sum, item) => sum + item.qty, 0);
            totalQty += catQty;
            subcategories.push({
              id: cat.id || cat.name,
              name: cat.displayName || cat.name || 'General',
              items: activeItems,
              totalQty: catQty,
            });
          }
        });
      }

      // Normalise display name
      let displayName = inv.displayName || inv.name || 'Other';
      if (inv.name === 'boxes_trolley') displayName = 'Boxes/Trolley';
      if (inv.name === 'other_appliances') displayName = 'Other Appliances';

      categories.push({
        id: inv.id || inv.name,
        name: displayName,
        count: totalQty,
        subcategories,
        isCustom: false,
      });
    });
  }

  // 2. Process custom items from items.customItems
  if (itemsData.customItems) {
    const customList = Array.isArray(itemsData.customItems.items)
      ? itemsData.customItems.items
      : [];
    const units = itemsData.customItems.units || 'feet';

    const parsedCustomItems = customList
      .filter((it) => (Number(it.item_qty) || 0) > 0 || it.item_name)
      .map((it) => {
        const qty = Number(it.item_qty) || 1;
        const dims = [it.item_length, it.item_width, it.item_height]
          .filter(Boolean)
          .join(' x ');
        const dimensionStr = dims ? `${dims} ${units}` : '';
        const detailsParts = [dimensionStr, it.item_description]
          .filter(Boolean)
          .join(' — ');

        return {
          id: it.id || it.item_name,
          name: it.item_name || 'Custom Item',
          qty,
          details: detailsParts,
          description: it.item_description || '',
          dimensions: dimensionStr,
        };
      });

    const totalCustomQty = parsedCustomItems.reduce((acc, it) => acc + it.qty, 0);

    categories.push({
      id: 'custom_items',
      name: 'Custom Items',
      count: totalCustomQty || parsedCustomItems.length,
      subcategories: [
        {
          id: 'custom_group',
          name: 'Custom Items',
          items: parsedCustomItems,
          totalQty: totalCustomQty,
        },
      ],
      isCustom: true,
    });
  }

  return categories;
}
