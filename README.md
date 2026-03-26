# Instagram Scraper – Profile & Post Data

Extract profile information and posts from Instagram. Get structured data for influencer research, social media monitoring, and content analysis.

## What it extracts

- Profile names and bios
- Post captions and hashtags
- Like and comment counts
- Follower/following counts
- Post URLs and timestamps

## Use cases

- **Influencer research** — Find and analyze potential partners
- **Social listening** — Monitor brand mentions and hashtags
- **Content strategy** — Analyze high-performing content patterns
- **Competitor analysis** — Track competitor Instagram activity

## Notes

- Scrapes publicly available Instagram data
- No Instagram account required
- Results depend on Instagram's current page structure

## Input

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| username | string | Yes | Instagram username |
| limit | number | No | Max posts to extract (default: 20) |
