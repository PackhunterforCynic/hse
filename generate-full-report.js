const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function getCodeSnippet(filePath, title) {
    try {
        const fullPath = path.join(__dirname, filePath);
        if (fs.existsSync(fullPath)) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            return `<h3>${title}</h3><pre>${content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`;
        }
    } catch (e) {}
    return '';
}

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Havilah Pro - Expanded Results & Conclusion</title>
    <style>
        body { font-family: "Times New Roman", Times, serif; font-size: 12pt; line-height: 1.6; padding: 20px; max-width: 900px; margin: auto; }
        h1, h2, h3, h4 { font-family: "Arial", sans-serif; font-weight: bold; }
        h1 { font-size: 16pt; margin-top: 24pt; margin-bottom: 12pt; text-align: center; text-transform: uppercase; }
        h2 { font-size: 14pt; margin-top: 20pt; margin-bottom: 10pt; }
        h3 { font-size: 12pt; margin-top: 14pt; margin-bottom: 8pt; color: #333; }
        p { margin-bottom: 12pt; text-align: justify; }
        pre { background-color: #f4f4f4; padding: 10px; border: 1px solid #ddd; font-family: "Courier New", Courier, monospace; font-size: 9pt; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word; }
        .page-break { page-break-before: always; }
        ul, ol { margin-bottom: 12pt; }
        li { margin-bottom: 6pt; text-align: justify; }
        .header-container { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #ccc; padding-bottom: 10px; margin-bottom: 20px; }
        .download-btn { background-color: #007bff; color: white; padding: 10px 15px; border: none; border-radius: 5px; cursor: pointer; font-size: 14px; font-family: Arial, sans-serif; font-weight: bold; }
        .download-btn:hover { background-color: #0056b3; }
    </style>
</head>
<body>

<div class="header-container">
    <div>
        <h1 style="text-align: left; margin: 0; text-transform: none;">Havilah Pro - Final Chapters</h1>
        <p style="margin: 0; font-family: Arial;">Expanded Implementation, Coding, Performance & Future</p>
    </div>
    <button class="download-btn" onclick="exportHTMLToDoc()">Download as DOCX</button>
</div>

<div id="export-content">
    
    <h1>Chapter 8 — Implementation, Results and Discussions</h1>

    <h2>8.1 Detailed Implementation Outcomes</h2>
    <p>The implementation phase of the Havilah Pro application represents the culmination of all architectural designs, transitioning conceptual models into a tangible, high-performance web application. This phase was executed using the Next.js 14 App Router, marking a significant structural departure from traditional React architectures. The primary focus during implementation was ensuring modularity, seamless state management, and strict separation of concerns between the client-side user interfaces and the serverless backend execution contexts.</p>
    
    <h3>8.1.1 Frontend Architecture & Component Modularity</h3>
    <p>The frontend architecture was designed utilizing a highly modular component tree. React 18's functional components and hooks were utilized extensively to encapsulate logic and styling. The application is divided into core logical domains: Layouts, UI Components, Context Providers, and Page Views. By isolating elements like the \`Navbar\`, \`Footer\`, and \`FloatingSocials\` into distinct components, the application ensures maximum reusability and minimizes code duplication across different routes. This modularity not only accelerated the initial development lifecycle but also establishes a foundation that allows future developers to introduce new features without destabilizing existing layouts.</p>
    <p>Furthermore, Tailwind CSS was implemented as the primary styling engine. Rather than relying on monolithic cascading stylesheets that can lead to specificity wars and bloated payloads, Tailwind's utility-first approach allowed styles to be colocated directly within the JSX markup. This implementation guarantees that the final production CSS bundle contains only the classes explicitly utilized in the application, significantly optimizing render times.</p>

    <h3>8.1.2 State Management and Context Architecture</h3>
    <p>Managing state across a complex React application requires a robust strategy. Havilah Pro implements the React Context API to handle global state variables that are required across deeply nested component trees without resorting to "prop drilling." Several distinct Context Providers were implemented:</p>
    <ul>
        <li><strong>Theme Context:</strong> Manages the global light/dark mode preference of the user. It interfaces directly with the browser's \`localStorage\` to persist user preferences across sessions, and dynamically updates the root HTML element's class list to trigger Tailwind's dark mode selectors seamlessly.</li>
        <li><strong>Language Context:</strong> Facilitates the Internationalization (i18n) of the platform. It controls the state of the Google Translate widget, ensuring that language preferences are synchronized across all navigation events.</li>
        <li><strong>Cookie Consent Context:</strong> Manages privacy compliance by tracking whether the user has consented to marketing and analytics scripts, ensuring compliance with global data protection regulations before injecting third-party tracking codes.</li>
    </ul>

    <h3>8.1.3 Serverless API Integration & Form Handling</h3>
    <p>A major architectural decision during implementation was the complete removal of a traditional monolithic backend (such as Node.js/Express) and relational database (such as PostgreSQL). Instead, the system relies entirely on Next.js Serverless API routes (\`/api/*\`). This implementation drastically reduces hosting costs and eliminates database maintenance overhead.</p>
    <p>Forms across the platform (Contact, Internships, Appointments) were implemented using controlled React components. When a user submits a form, the frontend sanitizes the data and transmits a JSON payload to the corresponding Next.js API route. The API route then acts as a secure middleware, authenticating against the external Resend API using secured environment variables (\`RESEND_API_KEY\`). The Resend API processes the request and dispatches highly formatted, responsive HTML emails directly to the agency's administrators. This serverless approach guarantees instantaneous lead generation processing while maintaining strict security perimeters, as API keys are never exposed to the client-side bundle.</p>

    <h3>8.1.4 UI/UX Enhancements with Framer Motion</h3>
    <p>To establish a premium, cinematic identity suitable for a media agency, static UI elements were deemed insufficient. The implementation incorporated \`framer-motion\`, a production-ready motion library for React. Key elements across the homepage and portfolio grids were wrapped in \`motion.div\` components. These elements were configured with \`initial\` and \`whileInView\` properties, creating staggered, viewport-triggered scroll reveals. This ensures that as users navigate down the page, content gracefully fades and translates into view, providing a fluid and engaging user experience that directly mirrors the high-quality cinematic productions offered by the agency.</p>

    <h3>8.1.5 SEO and Metadata Strategy</h3>
    <p>Search Engine Optimization (SEO) was a critical requirement for the public-facing platform. The Next.js App Router's built-in Metadata API was utilized to generate unique, statically optimized \`&lt;head&gt;\` tags for every route. A dynamic \`sitemap.ts\` was implemented at the root of the \`app\` directory. This script programmatically iterates over the \`projectsData\`, \`servicesData\`, and static routes to output a constantly up-to-date XML sitemap, ensuring that search engine crawlers immediately discover new portfolio additions without manual XML editing.</p>
    <p>Additionally, JSON-LD structured data (Schema.org) was injected into the root layout, explicitly defining the organization's name, logo, contact points, and social profiles. This semantic implementation greatly increases the probability of the site achieving "Rich Snippets" and knowledge panels within Google Search results.</p>

    <div class="page-break"></div>

    <h2>8.2 Application Source Code</h2>
    <p>The following pages document the core source code implemented during the development phase. This collection highlights the structural integrity of the Next.js layouts, the serverless API endpoints, and the complex React components governing the user interface.</p>

    ${getCodeSnippet('src/app/layout.tsx', '8.2.1 Root Layout Configuration (layout.tsx)')}
    ${getCodeSnippet('src/app/page.tsx', '8.2.2 Main Landing Page (page.tsx)')}
    ${getCodeSnippet('src/app/api/contact/route.ts', '8.2.3 Contact API Route (api/contact/route.ts)')}
    ${getCodeSnippet('src/app/api/appointments/route.ts', '8.2.4 Appointments API Route (api/appointments/route.ts)')}
    ${getCodeSnippet('src/components/layout/Navbar.tsx', '8.2.5 Navigation Bar Component (Navbar.tsx)')}
    ${getCodeSnippet('src/components/Chatbot.tsx', '8.2.6 AI Chatbot Interface (Chatbot.tsx)')}
    ${getCodeSnippet('src/components/FloatingSocials.tsx', '8.2.7 Floating Social Media Component (FloatingSocials.tsx)')}
    ${getCodeSnippet('src/utils/projectsData.ts', '8.2.8 Projects Data Structure (projectsData.ts)')}
    ${getCodeSnippet('src/app/sitemap.ts', '8.2.9 Dynamic Sitemap Generator (sitemap.ts)')}
    ${getCodeSnippet('tailwind.config.ts', '8.2.10 Tailwind CSS Configuration (tailwind.config.ts)')}

    <div class="page-break"></div>

    <h2>8.3 Testing Outcomes</h2>
    <p>As documented extensively in Chapter 7, the application underwent a rigorous software testing lifecycle encompassing Unit Testing, Integration Testing, System Testing, and Acceptance Testing. A total of 40 detailed test cases were executed against the architecture.</p>
    <p>The testing phase concluded with a 100% pass rate. The Next.js API routes demonstrated robust error handling (such as returning 500 status codes gracefully rather than crashing the server during API failures). The frontend UI passed all accessibility and responsiveness benchmarks on both mobile and desktop viewports. Form validation securely prevented invalid payloads from reaching the backend, ensuring data integrity.</p>

    <h2>8.4 Performance and Scalability</h2>
    <p>Performance and scalability are critical for a media-heavy portfolio website. Havilah Pro achieves high performance through a combination of cutting-edge web technologies and strict asset optimization protocols.</p>
    <ul>
        <li><strong>Static Site Generation (SSG) & Edge Caching:</strong> Next.js pre-renders the vast majority of the application into static HTML and CSS files at build time. When a user requests a page, the server does not need to execute complex logic or database queries; it simply serves the cached static file via a Content Delivery Network (CDN). This results in near-instantaneous Time to First Byte (TTFB).</li>
        <li><strong>Automated Media Optimization:</strong> Given the heavy reliance on photography and video, unoptimized media would traditionally paralyze load times. The Next.js \`&lt;Image&gt;\` component was implemented globally. This component automatically resizes, compresses, and converts images to modern formats (like WebP) based on the requesting device's viewport. Furthermore, all images below the initial fold are automatically lazy-loaded, drastically reducing the initial page weight.</li>
        <li><strong>Stateless Infinite Scalability:</strong> The architecture's complete lack of a persistent, monolithic database means there are no connection pooling limits or database locking mechanisms to bottleneck traffic. If a marketing campaign drives a massive, sudden influx of users to the site, the Vercel/Hostinger edge network simply spins up additional lightweight serverless functions to handle the Resend API form dispatches. The application scales horizontally and infinitely by design.</li>
    </ul>

    <h2>8.5 Challenges and Solutions</h2>
    <p>During the development lifecycle, several technical hurdles were encountered. Systematic debugging and architectural pivoting were required to overcome these challenges.</p>
    
    <h3>Challenge 1: Build-Time Environment Variable Panics</h3>
    <p><strong>Issue:</strong> During the Next.js static build generation on the deployment server, the build process crashed violently with an "Error: Missing API Key". The Next.js static analyzer attempts to pre-render API routes (\`/api/contact/route.ts\`), which initialize the Resend client. Because sensitive environment variables (\`RESEND_API_KEY\`) are intentionally omitted from static build phases for security, the Resend SDK threw a fatal exception.</p>
    <p><strong>Solution:</strong> Implemented a safe fallback initialization bypass. The code was updated to \`new Resend(process.env.RESEND_API_KEY || 're_dummy')\`. This instructs the static analyzer to safely bypass the initialization block during the safe build time using the dummy string, while securely utilizing the actual hidden environment variable during runtime execution.</p>

    <h3>Challenge 2: Mobile Viewport Z-Index Overlaps</h3>
    <p><strong>Issue:</strong> User Acceptance Testing (UAT) revealed a critical UX defect on mobile devices. The Floating Socials component and the Chatbot trigger button occupied similar CSS coordinates (bottom-right and bottom-center). On narrow mobile screens, these fixed-position elements overlapped significantly, preventing users from clicking either widget.</p>
    <p><strong>Solution:</strong> The Tailwind CSS classes governing the positioning were entirely decoupled. Media queries were introduced to anchor the socials to the \`bottom-left\` strictly on mobile viewports (\`max-width: 768px\`), keeping the \`bottom-right\` strictly reserved for the Chatbot trigger, eliminating the UI intersection.</p>

    <div class="page-break"></div>

    <h1>Chapter 9 — Conclusion & Future Enhancements</h1>
    
    <h2>9.1 Conclusion</h2>
    <p>The successful development and deployment of the Havilah Pro web application marks a significant milestone in modernizing the agency's digital infrastructure. By transitioning from a legacy static site to a high-performance, Next.js-driven architecture, the platform now offers unparalleled speed, aesthetic fluidity, and robust client engagement capabilities.</p>
    <p>The strategic implementation of Serverless API functions combined with the Resend API successfully decentralized data handling. This allowed the agency to securely receive inquiries, internship applications, and appointment requests via real-time email notifications, completely bypassing the financial and technical overhead of maintaining a relational database. Furthermore, the integration of Tailwind CSS alongside Framer Motion successfully captured the cinematic, premium brand identity required by the client.</p>
    <p>Rigorous testing across 40 distinct scenarios validated that the system is free of critical defects, highly accessible across all devices, and expertly optimized for search engine indexing. The project met all functional and non-functional requirements laid out in the initial system analysis phases, resulting in a scalable, future-proof platform ready to drive global business growth for Havilah Pro.</p>

    <h2>9.2 Future Enhancements</h2>
    <p>While the current iteration of the software successfully fulfills all baseline requirements, software development is an iterative process. Several enhancements have been identified for future deployment phases to further scale the platform's capabilities:</p>
    <ul>
        <li><strong>Headless CMS Integration:</strong> Currently, portfolio projects and services are hardcoded into TypeScript data files (\`projectsData.ts\`). Integrating a Headless Content Management System (such as Sanity.io or Strapi) would allow non-technical administrators to upload new cinematic projects and update text content directly through a GUI dashboard without requiring codebase redeployments.</li>
        <li><strong>Full Authentication & User Portal:</strong> Implementing an authentication layer (using NextAuth.js or Clerk) would enable the creation of a secure "Client Portal." Clients could log in to view project contracts, download raw media assets, and check the status of ongoing video editing pipelines directly from the website.</li>
        <li><strong>AI-Powered Chatbot Integration:</strong> The current Chatbot provides predefined, static responses based on keywords. Integrating the OpenAI API (ChatGPT) into the \`/api/chat\` route would allow the assistant to dynamically converse with potential clients, answering complex questions about pricing, availability, and camera equipment intelligently.</li>
        <li><strong>Integrated Payment Gateway:</strong> Connecting the Appointment booking forms to a payment processor like Stripe would allow clients to pay scheduling deposits or purchase complete service packages directly on the platform, fully automating the financial onboarding process.</li>
        <li><strong>Web Analytics Dashboard:</strong> While Google Analytics can be attached externally, building a custom admin dashboard to track exactly which projects receive the most engagement and which services generate the highest form conversion rates would provide invaluable business intelligence.</li>
    </ul>

    <div class="page-break"></div>

    <h1>Bibliography</h1>
    <ul>
        <li><strong>Next.js Documentation.</strong> Vercel Inc. "App Router Configuration, Data Fetching, and Serverless API Routes." Accessed August 2026. [Online]. Available: https://nextjs.org/docs</li>
        <li><strong>React Documentation.</strong> Meta Platforms, Inc. "React Components, State Management, and Hooks." Accessed August 2026. [Online]. Available: https://react.dev</li>
        <li><strong>Tailwind CSS Documentation.</strong> Tailwind Labs. "Utility-First CSS Framework and Mobile-First Responsive Design." Accessed August 2026. [Online]. Available: https://tailwindcss.com/docs</li>
        <li><strong>Framer Motion Documentation.</strong> Framer. "Animation and Gestures for React." Accessed August 2026. [Online]. Available: https://www.framer.com/motion/</li>
        <li><strong>Resend API Documentation.</strong> Resend. "Email API for Developers and Serverless Environments." Accessed August 2026. [Online]. Available: https://resend.com/docs</li>
        <li><strong>Schema.org.</strong> "Structured Data for Semantic Web SEO." Accessed August 2026. [Online]. Available: https://schema.org/</li>
    </ul>

</div>

<script>
    function exportHTMLToDoc() {
        var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
            "xmlns:w='urn:schemas-microsoft-com:office:word' " +
            "xmlns='http://www.w3.org/TR/REC-html40'>" +
            "<head><meta charset='utf-8'><title>Export HTML to Word Document</title>" +
            "<style>" +
            "body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.6; }" +
            "h1 { font-family: 'Arial', sans-serif; font-weight: bold; font-size: 16pt; margin-top: 24pt; margin-bottom: 12pt; text-align: center; page-break-before: always; text-transform: uppercase; }" +
            "h2 { font-family: 'Arial', sans-serif; font-weight: bold; font-size: 14pt; margin-top: 20pt; margin-bottom: 10pt; }" +
            "h3 { font-family: 'Arial', sans-serif; font-weight: bold; font-size: 12pt; margin-top: 14pt; margin-bottom: 8pt; color: #333; }" +
            "p { margin-bottom: 12pt; text-align: justify; }" +
            "pre { background-color: #f4f4f4; padding: 10px; border: 1px solid #ddd; font-family: 'Courier New', Courier, monospace; font-size: 9pt; }" +
            ".page-break { page-break-before: always; }" +
            "ul { margin-bottom: 12pt; } li { margin-bottom: 6pt; text-align: justify; }" +
            "</style></head><body>";
        var footer = "</body></html>";
        var sourceHTML = header + document.getElementById("export-content").innerHTML + footer;
        
        var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        var fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = 'expanded_report_ch8_9.doc';
        fileDownload.click();
        document.body.removeChild(fileDownload);
    }
</script>

</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'expanded-result.html'), htmlContent, 'utf-8');
console.log('Successfully generated expanded-result.html');
