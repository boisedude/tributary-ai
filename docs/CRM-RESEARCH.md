# CRM and Contact Database Research

*Research completed: January 29, 2026*

## Decision: Extend Supabase

Since quiz submissions already flow to Supabase, extend it as the central contact database.

### Benefits
- **Full data ownership** - PostgreSQL you control
- **No monthly CRM fees** - Free tier covers small scale
- **Single source of truth** - All contact data in one place
- **Tool flexibility** - Switch Apollo.io, Beehiiv, etc. anytime
- **Custom reporting** - Query with Claude Code as needed

### Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         SUPABASE                                 │
│               (Central Database - You Own This)                  │
│                                                                  │
│  ┌───────────┐  ┌───────────┐  ┌──────────────┐  ┌───────────┐  │
│  │ contacts  │  │ companies │  │ interactions │  │engagements│  │
│  └───────────┘  └───────────┘  └──────────────┘  └───────────┘  │
│  ┌───────────┐  ┌───────────┐  ┌──────────────┐  ┌───────────┐  │
│  │ invoices  │  │ expenses  │  │relationships │  │work_history│ │
│  └───────────┘  └───────────┘  └──────────────┘  └───────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    quiz_submissions                        │  │
│  └───────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
          │                │                │
          ▼                ▼                ▼
    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │Apollo.io │    │ Beehiiv  │    │ Resend   │
    │(optional)│    │(optional)│    │ (email)  │
    │ Outreach │    │Newsletter│    │          │
    └──────────┘    └──────────┘    └──────────┘
```

---

## CRM Tools Evaluated

| Tool | Monthly Cost | Pros | Cons |
|------|--------------|------|------|
| HubSpot Free | $0 | Full CRM, good UI | Data lock-in, upsells |
| Pipedrive | $14-99/user | Sales-focused | No free tier |
| Attio | $0-34/user | Modern, flexible | Newer, less proven |
| Folk | $0-39/user | Lightweight | Limited automation |
| Nimble | $25/user | Social integration | Dated UI |
| Close | $49-139/user | Built for sales | Expensive |
| Notion/Airtable | $0-20 | Flexible | Not a real CRM |
| **Supabase** | $0-25 | Full ownership, SQL | DIY setup required |

### Why Supabase Wins

1. **Already in use** - Quiz submissions go there
2. **No vendor lock-in** - Standard PostgreSQL
3. **Free tier generous** - 500MB, 50K monthly active users
4. **Full SQL access** - Any query you can imagine
5. **Row Level Security** - Enterprise-grade permissions
6. **Real-time subscriptions** - Live updates if needed
7. **API auto-generated** - REST and GraphQL built-in

---

## Integration Patterns

### Apollo.io (Sales Intelligence)

If using Apollo.io for prospecting:
- Store `apollo_id` in contacts table
- Sync enriched data (company size, funding, tech stack)
- Apollo for outreach sequences, Supabase for history

### Beehiiv (Newsletter)

If using Beehiiv for newsletters:
- Sync subscribers from Supabase
- Store `beehiiv_subscriber_id` for reference
- Track newsletter engagement back to contacts

### Quiz Submissions

Already connected - link quiz responses to contacts when email matches.

---

## Data Model

**Migrations:**
- `supabase/migrations/20260129100000_create_crm_tables.sql` - Core CRM tables
- `supabase/migrations/20260129110000_add_engagements_and_relationships.sql` - Engagements, relationships, tax tracking

### Tables (10)

| Table | Purpose |
|-------|---------|
| `companies` | Organizations (clients, prospects) |
| `contacts` | People with referral/source tracking |
| `interactions` | Calls, emails, meetings, notes |
| `invoices` | Invoice tracking with tax quarters |
| `invoice_line_items` | Itemized invoice breakdown |
| `expenses` | Business expenses with tax tracking |
| `engagements` | Projects/work linked to invoices |
| `contact_relationships` | Who knows who (Steve knows Brad) |
| `contact_work_history` | Employment history |
| `quiz_submissions` | Quiz results (existing) |

### Key Features

- **Auto-generated invoice numbers:** `generate_invoice_number()` creates `INV-2026-001`, etc.
- **Email domain extraction:** Contact's company_domain auto-populated from email
- **Interaction stats:** Contact's `last_interaction_at` and `interaction_count` auto-updated
- **Quiz linking:** `link_quiz_to_contact()` function creates/updates contact from quiz submission
- **Tax period tracking:** `tax_year` and `tax_quarter` auto-computed on invoices and expenses
- **Referral tracking:** Track who referred contacts and from what source

### Built-in Views (10)

| View | Purpose |
|------|---------|
| `contacts_with_company` | Contacts joined with company info |
| `outstanding_invoices` | Unpaid invoices with days overdue |
| `revenue_by_company` | Total invoiced/paid per client |
| `new_quiz_leads` | Quiz submitters not yet contacted |
| `active_engagements` | Projects with collected/outstanding amounts |
| `quarterly_revenue` | Revenue by tax quarter |
| `quarterly_expenses` | Expenses by tax quarter and category |
| `contact_network` | Who knows who (bidirectional) |
| `potential_intros` | Relationships where intro is possible |
| `referral_performance` | Conversion rate by referral source |

### Database Connection

```
# Pooler URL (for migrations/direct queries)
postgresql://postgres.ljakjvxryierwekzorbj:[PASSWORD]@aws-1-us-west-1.pooler.supabase.com:5432/postgres
```

Credentials stored in `.env.local` (gitignored).

---

## Reporting Approach

No pre-built dashboards needed. Use Claude Code to query Supabase:

**Examples:**
- "Show me all outstanding invoices"
- "Revenue by client this quarter"
- "Contacts who took the quiz but haven't booked a call"
- "Export invoice data for my CPA"

This provides unlimited flexibility without building/maintaining a reporting UI.
