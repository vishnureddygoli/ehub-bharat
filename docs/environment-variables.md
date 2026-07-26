# Environment Variable Documentation

Last reviewed: 2026-07-26

No production secrets are required for the static public website build.

## Recommended future variables

| Variable | Purpose | Sensitive |
| --- | --- | --- |
| `EHUB_CRM_ENDPOINT` | Approved CRM or lead-management endpoint for Government Project Desk submissions | No |
| `EHUB_CRM_API_KEY` | Auth token for CRM submission | Yes |
| `EHUB_EMAIL_PROVIDER_API_KEY` | Approved email delivery service for acknowledgements | Yes |
| `EHUB_ENQUIRY_TO_EMAIL` | Internal routing address for government enquiries | No |
| `EHUB_UPLOAD_SCAN_ENDPOINT` | Malware scanning service for uploaded documents | No |
| `EHUB_UPLOAD_SCAN_TOKEN` | Auth token for scanning service | Yes |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics measurement ID, only if approved | No |
| `NEXT_PUBLIC_SEARCH_CONSOLE_TOKEN` | Search Console verification, only if approved | No |
| `NEXT_PUBLIC_BING_VERIFICATION_TOKEN` | Bing Webmaster verification, only if approved | No |

## Privacy controls

- Do not send personal or sensitive enquiry information to analytics.
- Do not expose secrets in frontend code.
- Hosted runtime values should be managed through the hosting platform, not committed to the repository.
