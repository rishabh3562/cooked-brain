# Dependency and Security Review

## Outdated Packages
Based on `npm outdated` (current vs wanted vs latest):

| Package | Current | Wanted | Latest |
|---------|---------|--------|--------|
| @dnd-kit/core | ^6.1.0 | 6.3.1 | 6.3.1 |
| @dnd-kit/sortable | ^8.0.0 | 8.0.0 | 10.0.0 |
| @dnd-kit/utilities | ^3.2.2 | 3.2.2 | 3.2.2 |
| @radix-ui/react-dialog | ^1.0.5 | 1.1.15 | 1.1.15 |
| @radix-ui/react-dropdown-menu | ^2.0.6 | 2.1.16 | 2.1.16 |
| @radix-ui/react-label | ^2.0.2 | 2.1.8 | 2.1.8 |
| @radix-ui/react-select | ^2.0.0 | 2.2.6 | 2.2.6 |
| @radix-ui/react-slot | ^1.0.2 | 1.2.4 | 1.2.4 |
| @radix-ui/react-tabs | ^1.0.4 | 1.1.13 | 1.1.13 |
| @radix-ui/react-toast | ^1.1.5 | 1.2.15 | 1.2.15 |
| @supabase/ssr | ^0.0.10 | 0.0.10 | 0.10.2 |
| @supabase/supabase-js | ^2.39.3 | 2.103.3 | 2.103.3 |
| @tanstack/react-query | ^5.17.19 | 5.99.2 | 5.99.2 |
| class-variance-authority | ^0.7.0 | 0.7.1 | 0.7.1 |
| clsx | ^2.1.0 | 2.1.1 | 2.1.1 |
| lucide-react | ^0.312.0 | 0.312.0 | 1.8.0 |
| next | 14.1.0 | 14.1.0 | 16.2.4 |
| react | ^18.2.0 | 18.3.1 | 19.2.5 |
| react-dom | ^18.2.0 | 18.3.1 | 19.2.5 |
| reactflow | ^11.10.4 | 11.11.4 | 11.11.4 |
| tailwind-merge | ^2.2.0 | 2.6.1 | 3.5.0 |
| tailwindcss-animate | ^1.0.7 | 1.0.7 | 1.0.7 |

*Note: "Wanted" is the max version that satisfies the semver range in package.json. "Latest" is the version published in the registry.*

## Security Vulnerabilities
Based on `npm audit`:
- **Total:** 13 vulnerabilities (2 low, 2 moderate, 8 high, 1 critical)
- **Critical:** Next.js (multiple SSRF, cache poisoning, DoS, authorization bypass vulnerabilities)
- **High:** flatted, glob, minimatch, picomatch (various DoS, prototype pollution, command injection)
- **Moderate:** ajv (ReDoS), brace-expansion (process hang/memory exhaustion)
- **Low:** cookie (out-of-bounds character acceptance)

## Recommended Actions

### 1. Address Vulnerabilities
- **First pass (non-breaking fixes):**
  ```bash
  npm audit fix
  ```
  This will fix vulnerabilities that can be resolved without changing semver-major versions.

- **Second pass (including breaking changes):**
  ```bash
  npm audit fix --force
  ```
  **Note:** This will:
  - Upgrade `next` from 14.1.0 to 14.2.35 (patch update within minor version 14.x)
  - Upgrade `@supabase/ssr` from ^0.0.10 to 0.10.2 (major jump in minor version, potential breaking changes)
  - Upgrade `eslint-config-next` from 14.1.0 to 16.2.4 (major version change, likely breaking for ESLint config)
  Review the changes and test thoroughly after running.

### 2. Update Outdated Packages
Consider updating package.json to use more flexible version ranges to receive future updates automatically (while being cautious about breaking changes). Examples:
- Change `"next": "14.1.0"` → `"next": "^14.1.0"` or `"next": "^14.2.0"` to allow patch/minor updates within 14.x.
- For `@supabase/ssr`: `"@supabase/ssr": "^0.0.10"` → `"@supabase/ssr": "^0.10.0"` (after verifying compatibility).
- For `@tanstack/react-query`: `"@tanstack/react-query": "^5.17.19"` → `"@tanstack/react-query": "^5.99.0"`.
- For `lucide-react`: `"lucide-react": "^0.312.0"` → `"lucide-react": "^0.350.0"` (or higher).
- For `tailwind-merge`: `"tailwind-merge": "^2.2.0"` → `"tailwind-merge": "^3.0.0"`.
- For `react` and `react-dom`: Consider updating to React 18.3.x (latest in 18.x) or evaluating React 19.x.

### 3. License Compatibility
Run `npm license` or use `license-checker` to review licenses of all dependencies. Ensure they are compatible with your project's distribution and use case.

### 4. General Maintenance
- Regularly run `npm outdated` and `npm audit` (e.g., weekly or as part of CI).
- Consider using tools like `dependabot` or `renovate` for automated dependency updates.
- Keep lockfile (`package-lock.json`) committed to ensure reproducible builds.

## Files Created
- `DEPENDENCY_REVIEW.md` (this summary)

## Next Steps
1. Review the breaking changes indicated by `npm audit fix --force`.
2. Run the fix commands in a branch and run the test suite.
3. Update version ranges in package.json as appropriate.
4. Commit updated package.json and package-lock.json.