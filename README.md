# Challenge Award Automation

Playwright + TypeScript automation tests for the **GCA Challenge Award Epic (SP-1964)**.

Covers all 14 child stories: Network Challenge, Universities Challenge, and Start-Up Challenge — for both Admin and Coordinator sides, with full bilingual (Arabic/English) coverage.

## Stories Covered

| Story | Title |
|-------|-------|
| SP-1929 | Creating User Roles for University and Start-Up Challenge Coordinators |
| SP-1931 | Challenge Award Tab - Admin Side |
| SP-1932 | Network Challenge List - Admin Side |
| SP-1933 | Add New Entity - Network Challenge |
| SP-1944 | Network Challenge Application Link - User Side |
| SP-1945 | Viewing a Network Application - Admin |
| SP-1934 | Universities Challenge List - Admin Side |
| SP-1939 | Universities Challenge Application Link - User Side |
| SP-1938 | Viewing a University Application - Admin and Coordinator |
| SP-1952 | University Challenge Dashboard - Coordinator |
| SP-1936 | Start-Up Challenge List - Admin Side |
| SP-1940 | Start-Up Challenge Application Link - User Side |
| SP-1943 | Viewing a Start-Up Application - Admin and Coordinator |
| SP-1953 | Start-Up Challenge Dashboard - Coordinator |

## Project Structure

```
challenge-award-automation/
├── fixtures/
│   └── testData.ts              # Credentials and URLs
├── pages/
│   ├── LoginPage.ts             # Admin login page object
│   ├── ChallengeAwardPage.ts    # Admin challenge management
│   ├── ApplicationFormPage.ts   # User-side public forms
│   ├── ApplicationDetailPage.ts # Admin application review
│   └── CoordinatorDashboardPage.ts # Coordinator dashboard
├── tests/
│   └── challenge-award/
│       ├── 01-navigation.spec.ts
│       ├── 02-network-challenge-admin.spec.ts
│       ├── 03-network-challenge-user.spec.ts
│       ├── 04-universities-challenge-admin.spec.ts
│       ├── 05-universities-challenge-user.spec.ts
│       ├── 06-startup-challenge-admin.spec.ts
│       ├── 07-startup-challenge-user.spec.ts
│       ├── 08-coordinator-dashboards.spec.ts
│       └── 09-e2e-workflow.spec.ts
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

## Setup

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Copy environment variables
cp .env.example .env
# Then edit .env with actual values
```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run smoke tests only
npx playwright test --grep @smoke

# Run Arabic language tests
npx playwright test --grep @lang-ar

# Run English language tests
npx playwright test --grep @lang-en

# Run E2E workflow tests
npx playwright test --grep @e2e

# Run SEO/crawlability tests
npx playwright test --grep @seo

# Run specific story
npx playwright test --grep @SP-1944

# Run with HTML report
npx playwright test --reporter=html
npx playwright show-report
```

## Credentials

| Role | Email | Password | Status |
|------|-------|----------|--------|
| Admin | alaa.ramadan+ai@alweb.com | Test@1234 | Active |
| Uni Coordinator | TBD | TBD | Not yet developed |
| StartUp Coordinator | TBD | TBD | Not yet developed |

## URLs

| Page | URL |
|------|-----|
| Admin Panel | TBD (confirm when running) |
| Network Challenge EN | https://gca.stg.alweb4tech.com/en/Network-Challenge |
| Network Challenge AR | https://gca.stg.alweb4tech.com/Network-Challenge |
| Universities Challenge EN | https://gca.stg.alweb4tech.com/en/universities-challenge |
| Universities Challenge AR | https://gca.stg.alweb4tech.com/universities-challenge |
| Start-Up Challenge EN | https://gca.stg.alweb4tech.com/en/Start-Up-Challenge |
| Start-Up Challenge AR | https://gca.stg.alweb4tech.com/Start-Up-Challenge |

## Test Tags

| Tag | Description |
|-----|-------------|
| @smoke | Critical path tests |
| @regression | Full regression suite |
| @negative | Negative/error scenarios |
| @edge | Edge cases |
| @lang-en | English language tests (LTR) |
| @lang-ar | Arabic language tests (RTL) |
| @e2e | End-to-end workflow tests |
| @seo | SEO and crawlability tests |
| @SP-XXXX | Story-specific tag |

## Notes

- User-side challenge pages are **public** (no login required)
- - All 3 challenge pages must be **NOT crawlable** (noindex or robots.txt disallow)
  - - Coordinator tests are **skipped** until coordinator accounts are developed
    - - Every bilingual UI scenario is split into @lang-en and @lang-ar tests
      - - Admin URL is TBD — update `.env` before running admin tests
