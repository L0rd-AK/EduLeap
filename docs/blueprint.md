# **App Name**: EduLeap

## Core Features:

- Student Dashboard: Interactive dashboard displaying learning progress and projected ROI, course details, loan application status, and downloadable certificates.
- Course Catalog: Filterable course catalog with search and detailed course cards (title, duration, fees, skills, loan options).
- Student Onboarding: Streamlined registration and KYC document upload for new students.

## Style Guidelines:

- Primary color: Use a calming blue (#3498DB) to convey trust and stability.
- Secondary color: A warm grey (#ECF0F1) for backgrounds and neutral elements.
- Accent: A vibrant green (#2ECC71) to highlight key actions and positive progress indicators.
- Clean and structured layout with clear sectioning for easy navigation.
- Consistent and modern icon set to visually represent different features and actions.

## Original User Request:
create a website with vite+react.
npm create vite@latest

1. Home Page
Audience: All users (public-facing).
Purpose: Introduce the platform, highlight key features, and drive enrollment.
Content:

Hero section: Tagline ("Empowering students through Skills, Loans, and Guaranteed Income").

Key features:

"Access vocational courses with financial support."

"Track learning progress and earning potential."

"Micro-loans up to 3x course fees."

Call-to-action (CTA) buttons: "Browse Courses" (students) / "Admin Login" (admins).

Testimonials or success stories.

Footer: Links to Privacy Policy, Terms of Service, and contact information.

2. Student Registration & Onboarding Page
Audience: New students.
Purpose: Collect student details and verify eligibility.
Content:

Registration form: Name, email, phone, password.

Document upload section for KYC (ID, address proof).

Course selection dropdown (optional during onboarding).

Post-registration redirect to the dashboard.

3. Course Catalog Page
Audience: Students.
Purpose: Browse and enroll in courses.
Content:

Filterable course grid: Categories (e.g., IT, Healthcare, Trades), pricing models.

Course cards with details: Title, duration, fees, skills covered, enrollment status.

"Apply for Loan" button on each course card (triggers loan application flow).

Search bar and sorting options (price, popularity, duration).

4. Student Dashboard (Dual Journey Progress Tracker)
Audience: Students.
Purpose: Track learning progress and projected ROI.
Content:

Learning Progress Section:

Progress bar for course completion.

Milestone badges (micro-certifications) with download/share options.

Upcoming assignments/assessments.

Earning ROI Section:

ROI projection graph (compounded 10% quarterly growth).

Notifications like "Your ROI is growing!"

Quick links: Resume course, Apply for another loan, View certifications.

Graduation status indicator (e.g., "On track to graduate in Q3 2024" or "Waitlisted due to cap").

5. Loan Application Page
Audience: Students.
Purpose: Apply for micro-loans.
Content:

Loan eligibility calculator (course fee ×3 limit).

EMI plan selector with dynamic repayment schedule.

Agreement checkbox for terms and conditions.

Status tracker: "Pending Approval" / "Approved" / "Disbursed."

Document re-upload option (if required for verification).

6. Certifications Page
Audience: Students.
Purpose: Display and share earned certificates.
Content:

Grid of downloadable certificates (PDF/digital badges).

Verification features: QR code or certificate ID lookup.

Social sharing buttons (LinkedIn, email).

Milestone descriptions (e.g., "Completed Module 3: Advanced Coding").

7. Admin Dashboard
Audience: Administrators.
Purpose: Centralized management of courses, students, loans, and graduation caps.
Content:

Key Metrics Overview:

Total enrolled students, active loans, placement rates, revenue.

Quick-access widgets:

"Graduation Cap Status" (e.g., "50/100 slots filled").

"Pending Loan Applications."

"Course Enrollment Trends."

Navigation menu: Student Management, Course Management, Loan Management, Reports.

8. Student Management Page
Audience: Admins.
Purpose: Monitor and manage student records.
Content:

Searchable student list with filters (course, loan status, graduation queue).

Individual student profiles:

Progress summary, certifications, loan history.

Manual override options (e.g., mark as graduated).

Graduation queue table (students waiting due to cap).

9. Course Management Page
Audience: Admins.
Purpose: Create/update courses and set certification milestones.
Content:

Course creation form: Title, category, fee, description, modules.

Milestone configuration tool (define points for micro-certifications).

Certificate template editor (branding, content).

Publish/unpublish toggle for courses.

10. Loan Management Page
Audience: Admins.
Purpose: Approve/reject loans and track repayments.
Content:

List of loan applications with filters (pending/approved/rejected).

Eligibility verification panel (automated checks + manual review).

Repayment tracking table (EMI due dates, defaults).

Integration status with third-party payment gateways.

11. Graduation Cap Settings Page
Audience: Admins.
Purpose: Configure quarterly graduation limits.
Content:

Dropdown to select a course/program.

Input field for setting the quarterly cap (e.g., "Max 100 graduates").

Visual queue manager (students in line for graduation).

Notifications history (students alerted about waitlist status).

12. Reports & Analytics Page
Audience: Admins.
Purpose: Generate insights on platform performance.
Content:

Pre-built reports: Revenue, loan recovery rates, placement success.

Custom report builder (date range, metrics).

Export options (PDF, CSV).

ROI projection trends across student cohorts.

13. Profile Page
Audience: Students and Admins.
Purpose: Manage account settings.
Content:

Personal details (editable).

Password reset option.

Notification preferences.

Login history and security settings.

14. Help & Support Page
Audience: All users.
Purpose: Provide assistance and FAQs.
Content:

FAQs: Loan eligibility, certification issues, graduation cap queries.

Live chat/contact form.

Link to training manuals (for admins).

System status indicator (e.g., "All systems operational").

Key Design Considerations:
Responsive Design: Optimized for mobile and desktop.
  