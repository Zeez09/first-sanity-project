import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: "vvpbu2k6",
  dataset: "production",
  apiVersion: '2026-01-16',
  useCdn: true,
})
