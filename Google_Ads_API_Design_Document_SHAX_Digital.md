# Google Ads API Tool Design Document
## SHAX Digital Media & Commerce

---

## Company Information

**Company Name:** SHAX Digital Media & Commerce (泰顺山哈爱客电子商务)

**Company Website:** https://www.shaxdigital.com

**Business Registration Date:** June 30, 2025

**Business Location:** Room 406, Building 6, Fenqing Garden, Siqian She Ethnic Town, Taishun County, Wenzhou City, Zhejiang Province, China

---

## 1. Business Model

SHAX Digital is a professional digital advertising and e-commerce service company specializing in:

- **Digital Advertising Production:** Creating professional digital advertising content, video production, animation design, and interactive advertisements
- **Creative Design Services:** Brand design, graphic design, VI design, and packaging design for clients
- **Advertising Agency Services:** Media placement, performance monitoring, data analytics, and optimization consulting
- **Cultural Events Organization:** Planning and executing cultural and artistic exchange activities
- **Business Consulting:** Providing comprehensive business solutions including office services, conference & exhibition services

### Our Google Ads Usage

We manage Google Ads campaigns for:
1. **Our own company website** (shaxdigital.com) to promote our digital services
2. **Client advertising campaigns** - We serve as an authorized advertising agency for multiple clients in digital media, cultural events, and e-commerce sectors
3. **Multi-client portfolio management** - We manage campaigns across different industries and regions

We need Google Ads API access to efficiently manage multiple client accounts and provide data-driven advertising services.

---

## 2. Tool Overview

### Tool Name
**SHAX Ads Manager** - Internal Google Ads Campaign Management & Reporting Platform

### Primary Functions
1. **Campaign Performance Dashboard** - Real-time monitoring of ad performance across multiple client accounts
2. **Automated Reporting** - Generate PDF reports for clients showing campaign metrics and ROI
3. **Bulk Campaign Management** - Create and optimize ad campaigns at scale
4. **Budget Monitoring & Alerts** - Track spending and alert when budgets reach thresholds
5. **Cross-account Analytics** - Aggregate performance data across multiple client accounts

---

## 3. Tool Access and Users

### Internal Users (Employees)
- **Account Managers** - Manage client campaigns and view performance data
- **Creative Team** - Access ad performance to optimize creative content
- **Management** - View high-level analytics and reports across all accounts

### External Users (Clients)
- **Client Portal Access** - Clients can view their campaign performance through a secure client portal
- **Automated PDF Reports** - Clients receive automated weekly/monthly performance reports via email
- **Read-only Dashboard** - Selected clients can access read-only dashboards showing their campaign metrics

**Note:** External clients will NOT have direct API access. They only view data through our secure web interface.

---

## 4. Tool Architecture

### System Architecture Overview

Our SHAX Ads Manager is built on a modern, scalable architecture that follows industry best practices for security, performance, and maintainability. The system is designed as a multi-tier application with clear separation of concerns.

---

**System Architecture Diagram:**

The following diagram illustrates our multi-tier application architecture, showing the interaction between the frontend, backend, database, and Google Ads API services.

![System Architecture Diagram](./architecture-diagram.png)

*Figure 1: SHAX Ads Manager System Architecture - This diagram shows the complete system architecture with four main layers: Presentation Layer (frontend modules and web application), Application Layer (backend services and API server), Data Layer (PostgreSQL database), and External Services Layer (Google Ads API services). All components communicate through well-defined interfaces with proper authentication and data flow management.*

---

### System Components

#### 1. Frontend Layer

**Web Application (Next.js + React)**
- Modern single-page application (SPA) built with Next.js framework
- Server-side rendering (SSR) for improved performance and SEO
- Responsive design supporting desktop, tablet, and mobile devices
- Real-time data updates using WebSocket connections

**Frontend Modules:**
- **Dashboard Module:** Real-time campaign performance monitoring with interactive charts and KPI cards
- **Reports Module:** Customizable report generation with export capabilities (PDF, Excel, CSV)
- **Client Portal Module:** Secure, read-only interface for clients to view their campaign performance

#### 2. Backend Layer

**Backend API Server (Node.js / Python)**
- RESTful API architecture with JSON data exchange
- Horizontal scalability with load balancing support
- Containerized deployment using Docker
- Comprehensive API documentation using OpenAPI/Swagger

**Backend Services:**
- **Authentication & Authorization Service:** 
  - OAuth 2.0 implementation for secure user authentication
  - Role-based access control (RBAC) for permission management
  - JWT token-based session management
  - Multi-factor authentication (MFA) support

- **Google Ads API Integration Layer:**
  - Handles all communications with Google Ads API
  - Implements retry logic with exponential backoff
  - Rate limit management and quota monitoring
  - API request batching for improved efficiency
  - Error handling and logging

#### 3. Data Layer

**Database (PostgreSQL)**
- Primary relational database for all application data
- Tables include:
  - **Users:** Account information, roles, permissions
  - **Campaigns:** Campaign data synchronized from Google Ads
  - **Metrics:** Performance data (impressions, clicks, conversions, costs)
  - **Reports:** Generated report metadata and storage references
  - **Audit Logs:** Complete audit trail of all system actions

- Database features:
  - Automated daily backups with 30-day retention
  - Read replicas for reporting queries
  - Indexed for fast query performance
  - Encrypted at rest and in transit

#### 4. External Integration

**External Services (Google Ads API Services)**

Our application integrates with the following Google Ads API services:

1. **CustomerService:** 
   - Retrieve customer account information
   - Manage customer hierarchy and MCC (Manager) accounts
   - Access account settings and configurations

2. **CampaignService:**
   - Create, update, and delete advertising campaigns
   - Configure campaign settings (budget, bidding strategy, targeting)
   - Pause/resume campaigns based on performance or inventory

3. **AdGroupService:**
   - Manage ad groups within campaigns
   - Set ad group targeting and bidding parameters
   - Organize ads by themes or product categories

4. **AdGroupAdService:**
   - Create and update individual ads
   - Manage ad creative content and assets
   - Control ad status (enabled, paused, removed)

5. **GoogleAdsService (Reporting):**
   - Execute Google Ads Query Language (GAQL) queries
   - Retrieve performance metrics and statistics
   - Generate custom reports across campaigns and accounts

**Google Ads API Services (Core Integration Point)**
- All Google Ads API interactions flow through this integration point
- Centralized error handling and logging
- API version management to ensure compatibility
- Automatic OAuth token refresh

### Data Flow Architecture

The data flow in our system is designed to optimize performance, ensure data consistency, and respect Google Ads API rate limits.

#### Flow 1: User Viewing Dashboard (Read Operations)

```
User → Web Application → Backend API Server → Database → Display Results
```

**Process:**
1. User accesses the dashboard through their web browser
2. Web application sends authenticated request to Backend API Server
3. Backend validates user permissions and retrieves cached data from PostgreSQL database
4. Data is formatted and sent back to the frontend
5. Dashboard displays real-time metrics and charts

**Performance:** Average response time < 200ms (data served from database cache)

#### Flow 2: Campaign Data Synchronization (Scheduled Batch Operations)

```
Scheduled Job → Backend API Server → External Services (Google Ads API) → Database → Google Ads API Services
```

**Process:**
1. Automated cron jobs run every 6 hours (configurable)
2. Backend API Server requests data from Google Ads API through our Integration Layer
3. System retrieves campaign metrics using GoogleAdsService (Reporting)
4. Data is validated, transformed, and stored in PostgreSQL database
5. Database indexes are updated for fast querying

**Features:**
- Incremental sync to reduce API calls (only changed data)
- Parallel processing for multiple client accounts
- Error handling with automatic retry (3 attempts with exponential backoff)
- Sync status notifications sent to administrators

#### Flow 3: Campaign Management (Write Operations)

```
User → Web Application → Backend API Server → Authentication → External Services → Google Ads API
                                          ↓
                                      Database (Log)
```

**Process:**
1. User creates or modifies a campaign through the web interface
2. Web application sends request to Backend API Server
3. Backend validates user permissions and campaign data
4. Request is sent to Google Ads API through Integration Layer
   - Uses CampaignService for campaign modifications
   - Uses AdGroupService for ad group changes
   - Uses AdGroupAdService for ad creative updates
5. Database records the action in audit logs
6. Success/failure response sent back to user
7. If successful, database is updated with new campaign state

**Security:**
- All write operations require authentication and authorization
- Changes are logged with user ID, timestamp, and action details
- Role-based permissions prevent unauthorized modifications

#### Flow 4: Report Generation (Complex Operations)

```
User Request → Backend API Server → Database (Retrieve Data) → PDF Generation → Storage/Email Delivery
```

**Process:**
1. User or automated schedule triggers report generation
2. Backend retrieves performance data from database (covers date range)
3. Data is aggregated and analyzed
4. PDF report is generated with:
   - Company branding and client information
   - Performance charts and trend analysis
   - Key metrics summary tables
   - AI-generated recommendations (optional)
5. Report is stored in cloud storage (with secure link)
6. Email notification sent to client with download link
7. Client can also access report through Client Portal

**Report Types:**
- Daily performance snapshots
- Weekly summary reports
- Monthly comprehensive reports
- Custom date range reports

#### Flow 5: Real-time Data Requests (On-Demand API Calls)

```
User → Web Application → Backend API Server → External Services (Google Ads API) → Direct Response
```

**Process:**
1. User requests real-time data (e.g., current budget status, live campaign performance)
2. Backend determines data freshness in database
3. If data is stale (> 1 hour old), direct API call is made to Google Ads
4. Fresh data is returned to user and updated in database
5. Subsequent requests within 1 hour served from cache

**Use Cases:**
- Budget verification before campaign changes
- Real-time conversion tracking
- Account status checks

#### Data Flow Best Practices

1. **Minimize API Calls:** 
   - Use database caching for frequently accessed data
   - Batch multiple operations into single API requests
   - Implement smart refresh logic (only sync changed data)

2. **Respect Rate Limits:**
   - Monitor API quota usage in real-time
   - Queue requests during peak times
   - Implement exponential backoff for retries
   - Use webhook notifications when available

3. **Ensure Data Consistency:**
   - Database transactions for related operations
   - Conflict resolution for concurrent updates
   - Regular data validation and reconciliation

4. **Performance Optimization:**
   - Database query optimization with proper indexing
   - Lazy loading for large datasets
   - Pagination for report displays
   - Client-side caching for static resources

---

## 5. API Services Used

### Primary Services

1. **CustomerService**
   - List and manage client Google Ads accounts
   - Retrieve account hierarchy and settings

2. **CampaignService**
   - Create, update, and pause campaigns
   - Manage campaign budgets and bidding strategies

3. **AdGroupService**
   - Create and manage ad groups within campaigns
   - Set targeting and bidding parameters

4. **AdGroupAdService**
   - Create and update ads within ad groups
   - Manage ad status (enabled/paused)

5. **GoogleAdsService (Search/Reporting)**
   - Query campaign performance metrics
   - Pull reports for impressions, clicks, conversions, costs
   - Aggregate data across campaigns and accounts

### Data Retrieved

- Campaign performance metrics (impressions, clicks, CTR, conversions, cost, ROAS)
- Ad group and ad-level performance data
- Keyword performance and search terms
- Budget utilization and pacing
- Conversion tracking data

---

## 6. Reporting Features

### Dashboard View
- **Real-time metrics:** Current day performance across all accounts
- **Trend charts:** Performance over time (7, 30, 90 days)
- **Comparison views:** Period-over-period comparisons
- **Budget monitoring:** Spend tracking with visual indicators

### PDF Report Generation
- **Automated weekly/monthly reports** sent to clients
- **Custom report templates** with company branding
- **Key metrics summary:** Impressions, clicks, conversions, cost, ROI
- **Performance trends:** Charts showing campaign performance over time
- **Recommendations:** AI-generated insights and optimization suggestions

### Client Portal
- **Secure login** for each client to view their campaigns only
- **Read-only access** - clients cannot modify campaigns
- **Mobile-responsive design** for viewing on any device

---

## 7. Security & Privacy

### Data Security
- All API credentials stored encrypted in secure environment variables
- Database encrypted at rest and in transit (SSL/TLS)
- Regular security audits and updates
- Automatic token refresh implementation

### Access Control
- Role-based access control (RBAC)
- Multi-factor authentication (MFA) for internal users
- Session management and automatic timeout
- Audit logs for all API calls and user actions

### Privacy Compliance
- GDPR and data protection compliance
- Client data segregation - clients can only see their own data
- Data retention policies in place
- Privacy policy clearly displayed

### API Best Practices
- Respect rate limits with exponential backoff
- Batch requests where possible to minimize API calls
- Cache frequently accessed data
- Monitor API quota usage

---

## 8. Tool Mockups & UI Design

### Dashboard Overview
```
┌───────────────────────────────────────────────────────────────┐
│  SHAX Ads Manager                    [User] [Notifications]   │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │  Campaigns  │  │    Spend    │  │   ROAS      │          │
│  │     24      │  │  ¥12,450    │  │    3.2x     │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│                                                                │
│  Campaign Performance (Last 30 Days)                          │
│  ┌──────────────────────────────────────────────────────┐    │
│  │                                                       │    │
│  │     Chart: Impressions, Clicks, Conversions          │    │
│  │                                                       │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                                │
│  Active Campaigns                                             │
│  ┌──────────────────────────────────────────────────────┐    │
│  │ Campaign Name     | Impressions | Clicks | Cost      │    │
│  │ Brand Awareness   | 45,230      | 1,234  | ¥3,200    │    │
│  │ Product Launch    | 32,100      | 892    | ¥2,150    │    │
│  └──────────────────────────────────────────────────────┘    │
└───────────────────────────────────────────────────────────────┘
```

### Report Generation Interface
```
┌───────────────────────────────────────────────────────────────┐
│  Generate Client Report                                        │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  Select Client:      [Dropdown: Client A ▼]                   │
│  Report Period:      [Last 30 Days ▼]                         │
│  Include:            ☑ Performance Summary                     │
│                      ☑ Campaign Details                        │
│                      ☑ Optimization Recommendations            │
│                                                                │
│  Report Format:      ● PDF  ○ Excel                           │
│                                                                │
│  [Preview Report]  [Generate & Download]  [Email to Client]   │
│                                                                │
└───────────────────────────────────────────────────────────────┘
```

### Client Portal View
```
┌───────────────────────────────────────────────────────────────┐
│  Welcome, [Client Name]                         [Logout]       │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  Your Campaign Performance                                     │
│                                                                │
│  Period: Last 30 Days                     [Change Period ▼]   │
│                                                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │  Impressions│  │   Clicks    │  │Conversions  │          │
│  │   125,430   │  │    3,421    │  │     156     │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│                                                                │
│  [View Detailed Reports]  [Download PDF Report]               │
│                                                                │
└───────────────────────────────────────────────────────────────┘
```

---

## 9. Development Timeline

### Phase 1: Foundation (Weeks 1-2)
- Set up development environment
- Implement Google Ads API authentication
- Create database schema
- Build basic backend API

### Phase 2: Core Features (Weeks 3-6)
- Develop data sync jobs
- Build campaign management interface
- Create performance dashboard
- Implement reporting engine

### Phase 3: Advanced Features (Weeks 7-10)
- Add PDF report generation
- Build client portal
- Implement automated alerts
- Add bulk campaign operations

### Phase 4: Testing & Launch (Weeks 11-12)
- Security audit and testing
- User acceptance testing
- Documentation
- Production deployment

---

## 10. Compliance & Best Practices

### Google Ads API Policies
- We will strictly adhere to all Google Ads API Terms and Conditions
- We will not use the API to scrape data for competitive analysis
- We will respect all rate limits and usage quotas
- We will handle user data in accordance with privacy regulations

### Rate Limit Management
- Implement exponential backoff for retry logic
- Monitor API quota usage in real-time
- Queue and batch operations during off-peak hours
- Alert administrators when approaching limits

### Error Handling
- Comprehensive error logging and monitoring
- Graceful degradation when API is unavailable
- User-friendly error messages
- Automatic retry for transient failures

---

## 11. Support & Maintenance

- Dedicated development team for ongoing maintenance
- 24/7 system monitoring and alerts
- Regular updates to align with Google Ads API changes
- User support via email and ticketing system
- Monthly system performance reviews

---

## Contact Information

**API Contact Email:** api@shaxdigital.com (or q1263451893@gmail.com)

**Company Website:** https://www.shaxdigital.com

**Business Address:** Room 406, Building 6, Fenqing Garden, Siqian She Ethnic Town, Taishun County, Wenzhou City, Zhejiang Province, China

---

**Document Version:** 1.0  
**Date:** October 19, 2025  
**Prepared by:** SHAX Digital Development Team

---

This design document demonstrates our commitment to building a professional, secure, and compliant Google Ads API integration tool that will benefit both our company and our clients.

