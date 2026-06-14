# 📜 Changelog

All notable changes to **FreshDrop** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Placeholder for upcoming features — see [Roadmap](../README.md#-roadmap)

---

## [1.0.0] - 2025-01-01

### Added
- Initial release of FreshDrop 🎉
- Browse grocery products by category
- Search functionality for products
- Add / remove items from cart
- User authentication (login & register)
- Order placement and order history
- Email notifications via Brevo
- Background job processing via Inngest
- Image upload & storage via Cloudinary
- Optional Stripe payment integration
- Responsive UI built with React, TypeScript, and Tailwind CSS
- Deployment to Vercel (client & server)

---

## How to Update This Changelog

When releasing a new version:

1. Move items from `[Unreleased]` into a new version section, e.g. `## [1.1.0] - YYYY-MM-DD`
2. Group changes under: `Added`, `Changed`, `Fixed`, `Removed`, `Deprecated`, `Security`
3. Tag the release in Git:
   ```bash
   git tag -a v1.1.0 -m "Release v1.1.0"
   git push origin v1.1.0
   ```
