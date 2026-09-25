import { XMLParser, XMLValidator } from 'fast-xml-parser';
import type { MockUrbiumListing, ParsedUrbiumFeed } from './types';

function asArray<T>(value: T | T[] | undefined): T[] { return value == null ? [] : Array.isArray(value) ? value : [value]; }

/**
 * Parses the temporary mock schema. Replace only this extraction when Urbium supplies
 * its official XML specification. External entity declarations are rejected.
 */
export function parseUrbiumFeed(xml: string): ParsedUrbiumFeed {
  if (!xml.trim()) throw new Error('XML feed is empty.');
  if (/<!DOCTYPE|<!ENTITY/i.test(xml)) throw new Error('DOCTYPE and ENTITY declarations are not allowed.');
  const valid = XMLValidator.validate(xml);
  if (valid !== true) throw new Error(`Invalid XML: ${valid.err.msg}`);
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '', trimValues: true, processEntities: false, parseTagValue: false, parseAttributeValue: false });
  const document = parser.parse(xml) as { urbiumMockFeed?: { completeSnapshot?: string; listings?: { listing?: MockUrbiumListing | MockUrbiumListing[] } } };
  const root = document.urbiumMockFeed;
  if (!root) throw new Error('Unsupported XML root. Awaiting the official Urbium schema.');
  return { listings: asArray(root.listings?.listing), completeSnapshot: String(root.completeSnapshot).toLowerCase() === 'true' };
}
