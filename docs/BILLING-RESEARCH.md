# Billing, Invoicing, and Bookkeeping Research

*Research completed: January 29, 2026*

## Decision: Minimal Stack

For a solo B2B consulting firm with 5-10 high-value clients ($25K-$35K engagements), the recommended approach is:

| Function | Solution | Cost |
|----------|----------|------|
| Invoice tracking | Supabase | $0 |
| PDF invoice generation | Custom (Next.js + react-pdf) | $0 |
| Email invoices | Resend | $0-20/mo |
| Receive payments | Business bank account (ACH/wire) | $0 |
| Reporting | Claude Code queries Supabase | $0 |
| Tax preparation | CPA annually | ~$2,000/year |

**Why no Stripe?** B2B clients at $25K+ typically pay via ACH/wire transfer. No payment processor needed.

**Why no QuickBooks?** With few clients and expenses, CPA can work from bank statements + invoice export. Reconsider if you hire contractors (need 1099s) or have complex expenses.

---

## Tool Comparison Summary

### Invoicing Tools Evaluated

| Tool | Monthly Cost | ACH Fees | Best For |
|------|--------------|----------|----------|
| Stripe | $0 base | 0.8% (capped $5) | High-volume, SaaS |
| QuickBooks | $35-90 | 1% (uncapped) | All-in-one simplicity |
| FreshBooks | $19-60 | 1% | Consultant proposals |
| Wave | $0 | 1% | Side hustles |
| Xero | $15-78 | Via Stripe | International clients |
| HoneyBook | $19-79 | 1.5% | Creative professionals |
| Harvest | $0-12/seat | Via Stripe | Time tracking focus |

### Accounting Tools Evaluated

| Tool | Monthly Cost | Best For |
|------|--------------|----------|
| QuickBooks Online | $35-90 | US small business standard |
| Xero | $15-78 | Modern UX, international |
| Wave | $0 | Very simple businesses |
| Bench | $299-499 | Done-for-you bookkeeping |
| Pilot | $500-800 | VC-backed startups |

---

## If You Later Need Payment Processing

**Recommended: Stripe**
- ACH fees capped at $5 (huge savings on $25K+ invoices)
- Native QuickBooks integration
- Professional checkout experience
- Best APIs for automation

**Fee Comparison on $25K Invoice:**
| Method | Stripe | QuickBooks |
|--------|--------|------------|
| ACH | $5 | $250 |
| Credit Card | $725 | $750 |

---

## If You Later Need Accounting Software

**Recommended: QuickBooks Online Simple Start ($35/mo)**
- CPAs universally familiar
- Bank reconciliation
- Tax-ready reports
- 1099 generation for contractors

---

## Idaho Tax Notes

- **Sales Tax:** Professional consulting services are NOT taxable in Idaho
- **Estimated Taxes:** Pay quarterly if expecting $1,000+ in tax liability
- **Due Dates:** April 15, June 15, September 15, January 15
- **Records:** Keep invoices, bank statements, receipts for 7 years
- **S-Corp:** Consider for tax savings if revenue exceeds ~$80K (consult CPA)

---

## Annual Cost Comparison

| Approach | Annual Cost |
|----------|-------------|
| **Supabase + CPA** | ~$2,000 |
| QuickBooks + CPA | ~$3,000 |
| QuickBooks + Stripe + CPA | ~$3,100 |
| Full stack (Bench bookkeeping) | ~$6,000+ |

The minimal approach saves $1,000+/year with no loss of functionality for a small consulting practice.
