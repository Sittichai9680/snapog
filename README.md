# SnapOG

Free Open Graph image generator. Renders 1200×630 OG cards in your browser on an HTML canvas — **no server, no API key, no signup, no rate limit, no build step.**

**Live:** https://sittichai9680.github.io/snapog/

## How it works

Open the page, type your title/description/domain/author, pick a theme, and download a PNG. Or generate the same card from a URL — every field is a query param:

```
https://sittichai9680.github.io/snapog/?title=Your%20Title&description=Your%20subtitle&domain=example.com&author=You&tag=FREE&theme=dark
```

Then drop the downloaded PNG into your site and point your `<meta og:image>` at it:

```html
<meta property="og:image" content="https://yoursite.com/og-card.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```

OG scrapers (Twitter, Facebook, Slack, LinkedIn) don't run JavaScript and expect an **image file**, not an HTML page — so host the PNG, don't link the generator.

## Why

Every project needs a share card. Most generators are paid, rate-limited, or require an account. SnapOG is a single HTML file you can self-host anywhere static — fork it, drop it on any host, done.

## Self-host

Copy `index.html` to any static host. That's the whole install. Zero dependencies.

## License

MIT
