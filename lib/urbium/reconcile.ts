import { PROPERTY_STATUS, propertySchema, type Property } from '@/lib/properties/model';

const comparable = (property: Property) => {
  const copy = structuredClone(property);
  delete copy.lastSeenAt;
  return JSON.stringify(copy);
};

export function planUrbiumSync(existing: Property[], incoming: Property[], completeSnapshot: boolean) {
  const incomingIds = new Set<string>();
  const existingById = new Map(existing.map((property) => [property.externalId, property]));
  let created = 0;
  let updated = 0;
  let unchanged = 0;

  for (const rawProperty of incoming) {
    const property = propertySchema.parse(rawProperty);
    if (incomingIds.has(property.externalId)) throw new Error(`Duplicate external property ID: ${property.externalId}`);
    incomingIds.add(property.externalId);
    const previous = existingById.get(property.externalId);
    if (!previous) created += 1;
    else if (comparable(previous) === comparable(property)) unchanged += 1;
    else updated += 1;
  }

  const toUnpublish = completeSnapshot
    ? existing.filter((property) => !incomingIds.has(property.externalId) && property.status !== PROPERTY_STATUS.UNPUBLISHED && property.status !== PROPERTY_STATUS.ARCHIVED)
    : [];

  return { created, updated, unchanged, archived: toUnpublish.length, toUnpublish };
}
