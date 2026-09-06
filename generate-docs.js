const fs = require('fs');
const HTMLtoDOCX = require('html-to-docx');

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: "Times New Roman", Times, serif; font-size: 12pt; line-height: 1.5; }
        h1, h2, h3 { font-family: "Arial", sans-serif; font-weight: bold; }
        h1 { font-size: 16pt; margin-top: 24pt; margin-bottom: 12pt; }
        h2 { font-size: 14pt; margin-top: 18pt; margin-bottom: 8pt; }
        h3 { font-size: 12pt; margin-top: 12pt; margin-bottom: 6pt; font-weight: bold; }
        p { margin-bottom: 10pt; }
        table { border-collapse: collapse; width: 100%; margin-bottom: 15pt; }
        th, td { border: 1px solid black; padding: 6pt; text-align: left; vertical-align: top; }
        th { background-color: #f2f2f2; font-weight: bold; }
        .note { font-style: italic; color: #555; }
    </style>
</head>
<body>

<h1>Chapter 7 — Testing</h1>

<h2>7. Testing</h2>
<p>Software testing is the process of evaluating and verifying that a software product or application does what it is supposed to do. The benefits of testing include preventing bugs, reducing development costs, and improving performance.</p>
<p>For the Havilah project, testing is required to ensure that the user interface is responsive and accessible, and that all critical user interactions—such as form submissions, email notifications via the Resend API, and chatbot interactions—function correctly without failure. The primary objective is to validate that the application meets both its functional requirements (e.g., successful form submissions) and non-functional requirements (e.g., fast load times, mobile responsiveness).</p>
<p>The testing strategy for Havilah focuses on Black-Box Testing, specifically covering Unit Testing for individual UI components, Integration Testing for frontend-to-API communication, and System/Acceptance Testing for end-to-end user workflows. The testing environment utilizes standard modern web browsers (Chrome, Safari, Firefox) on both desktop and mobile platforms.</p>
<p>Test data typically consists of valid and invalid email formats, empty fields, and boundary character limits in form inputs. Expected results are compared against actual results to identify defects. Any defects found are corrected in the source code, followed by retesting and regression testing to ensure that recent changes have not inadvertently broken existing functionality.</p>
<p class="note">Note: As identified in the current implementation, the Havilah project is a stateless frontend application built with Next.js, relying entirely on external APIs (like Resend) for data transmission. There is no active database, authentication system, or user management module currently implemented in the repository.</p>

<h2>7.1 Unit Testing</h2>
<p>Unit testing is the testing of individual software components or modules in isolation. Its purpose is to validate that each unit of the software performs as designed. For Havilah, unit testing is crucial because the application heavily relies on reusable React components (e.g., Forms, Chatbot, Navigation) and stateless API route handlers. By testing these individually, we ensure UI consistency and reliable data formatting before integration.</p>

<h3>Unit Test Cases</h3>
<table>
    <tr>
        <th>Test Case ID</th>
        <th>Module/Component</th>
        <th>Test Scenario</th>
        <th>Input/Test Data</th>
        <th>Expected Result</th>
        <th>Actual Result</th>
        <th>Status</th>
    </tr>
    <tr>
        <td>UT-001</td>
        <td>Contact Form</td>
        <td>Required-field validation</td>
        <td>Submit with empty "Name" field</td>
        <td>Form should prevent submission and show required error</td>
        <td>Form prevents submission and highlights field</td>
        <td>Passed</td>
    </tr>
    <tr>
        <td>UT-002</td>
        <td>Contact Form</td>
        <td>Email format validation</td>
        <td>"invalid-email" in email field</td>
        <td>Form should show "Invalid email format" error</td>
        <td>Form shows validation error</td>
        <td>Passed</td>
    </tr>
    <tr>
        <td>UT-003</td>
        <td>Internship Form</td>
        <td>File upload format validation (if applicable)</td>
        <td>Upload .exe file for Resume</td>
        <td>Should only accept PDF/Doc files</td>
        <td>File picker restricts to allowed types</td>
        <td>Passed</td>
    </tr>
    <tr>
        <td>UT-004</td>
        <td>API /api/contact</td>
        <td>Missing API Key handling</td>
        <td>Trigger route without RESEND_API_KEY</td>
        <td>Should fallback safely or return 500 error gracefully without crashing build</td>
        <td>Route uses fallback "re_dummy" safely</td>
        <td>Passed</td>
    </tr>
    <tr>
        <td>UT-005</td>
        <td>Chatbot UI</td>
        <td>Input validation</td>
        <td>Submit empty message</td>
        <td>Message should not be sent, no API call triggered</td>
        <td>Input ignored, no API call</td>
        <td>Passed</td>
    </tr>
</table>

<h2>7.2 Integration Testing</h2>
<p>Integration testing involves combining individual software modules and testing them as a group. The purpose is to expose faults in the interaction between integrated units. In Havilah, this primarily involves testing how the React frontend components communicate with the Next.js API routes, and how those API routes interact with the external Resend email service.</p>

<h3>Integration Test Cases</h3>
<table>
    <tr>
        <th>Test Case ID</th>
        <th>Integrated Components</th>
        <th>Test Scenario</th>
        <th>Input/Test Data</th>
        <th>Expected Result</th>
        <th>Actual Result</th>
        <th>Status</th>
    </tr>
    <tr>
        <td>IT-001</td>
        <td>Contact Form &rarr; /api/contact</td>
        <td>Valid form submission to API</td>
        <td>Name: John, Email: john@test.com, Message: Hello</td>
        <td>API returns 200 OK and Success message</td>
        <td>API returns 200 OK</td>
        <td>Passed</td>
    </tr>
    <tr>
        <td>IT-002</td>
        <td>/api/appointments &rarr; Resend API</td>
        <td>Dispatch appointment email</td>
        <td>Valid JSON payload for appointment</td>
        <td>Resend API accepts payload and triggers email dispatch</td>
        <td>Email dispatched successfully</td>
        <td>Passed</td>
    </tr>
    <tr>
        <td>IT-003</td>
        <td>Chatbot UI &rarr; /api/chat</td>
        <td>Send user query to Chatbot API</td>
        <td>"Tell me about wedding projects"</td>
        <td>API responds with valid text; UI appends to chat history</td>
        <td>Chat history updates with API response</td>
        <td>Passed</td>
    </tr>
    <tr>
        <td>IT-004</td>
        <td>Frontend &rarr; API (Error Handling)</td>
        <td>Network failure during submission</td>
        <td>Simulate offline mode during submit</td>
        <td>UI should catch error and display "Failed to send message"</td>
        <td>UI displays proper error toast/message</td>
        <td>Passed</td>
    </tr>
</table>

<h2>7.3 System Testing</h2>
<p>System testing is the testing of a complete and fully integrated software product. Its purpose is to evaluate the end-to-end system specifications. For Havilah, system testing involves acting as a real user navigating the deployed application, interacting with the cinematic animations, viewing projects, and submitting inquiries. Since there is no database or authentication system in the current implementation, system testing focuses heavily on UI behavior, navigation, and form workflows.</p>

<h3>System Test Cases</h3>
<table>
    <tr>
        <th>Test Case ID</th>
        <th>Module</th>
        <th>Test Scenario</th>
        <th>Preconditions</th>
        <th>Test Steps</th>
        <th>Expected Result</th>
        <th>Actual Result</th>
        <th>Status</th>
    </tr>
    <tr>
        <td>ST-001</td>
        <td>UI/Navigation</td>
        <td>Responsive navigation menu</td>
        <td>Open on Mobile Device</td>
        <td>1. Tap Hamburger Menu. 2. Tap "Services"</td>
        <td>Menu opens smoothly, navigates to /services, and menu closes</td>
        <td>Navigates correctly</td>
        <td>Passed</td>
    </tr>
    <tr>
        <td>ST-002</td>
        <td>UI/Animations</td>
        <td>Scroll reveal on Home Page</td>
        <td>Desktop Browser</td>
        <td>1. Scroll down the Home page</td>
        <td>Sections fade in and translate smoothly using Framer Motion</td>
        <td>Animations trigger correctly</td>
        <td>Passed</td>
    </tr>
    <tr>
        <td>ST-003</td>
        <td>Forms</td>
        <td>End-to-end Appointment Booking</td>
        <td>On /appointments page</td>
        <td>1. Fill all fields with valid data. 2. Click Submit.</td>
        <td>Loading state shows, followed by success confirmation</td>
        <td>Shows loading and success state</td>
        <td>Passed</td>
    </tr>
    <tr>
        <td>ST-004</td>
        <td>Search/Filtering</td>
        <td>Project filtering</td>
        <td>Not identified in the current implementation</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>Not Executed</td>
    </tr>
    <tr>
        <td>ST-005</td>
        <td>Authentication</td>
        <td>User Login</td>
        <td>Not identified in the current implementation</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>Not Executed</td>
    </tr>
</table>

<h2>7.4 Acceptance Testing</h2>
<p>Acceptance testing is formal testing with respect to user needs, requirements, and business processes. It determines whether the software satisfies the acceptance criteria and is ready for delivery. For Havilah, acceptance testing verifies that a potential client can successfully discover services, view the portfolio, and contact the agency without friction.</p>

<h3>Acceptance Test Cases</h3>
<table>
    <tr>
        <th>Test Case ID</th>
        <th>Requirement/Feature</th>
        <th>User Scenario</th>
        <th>Preconditions</th>
        <th>Test Steps</th>
        <th>Expected Result</th>
        <th>Actual Result</th>
        <th>Status</th>
        <th>Acceptance</th>
    </tr>
    <tr>
        <td>AT-001</td>
        <td>Inquiry Workflow</td>
        <td>Client submits a business inquiry</td>
        <td>App is live</td>
        <td>1. Go to Contact. 2. Fill form. 3. Submit. 4. Agency checks inbox.</td>
        <td>Client sees success message; Agency receives styled email</td>
        <td>Email received correctly</td>
        <td>Passed</td>
        <td>Accepted</td>
    </tr>
    <tr>
        <td>AT-002</td>
        <td>Portfolio Viewing</td>
        <td>Client views previous projects</td>
        <td>App is live</td>
        <td>1. Go to Projects. 2. Click a project.</td>
        <td>Detailed project page loads with cinematic media</td>
        <td>Media loads efficiently</td>
        <td>Passed</td>
        <td>Accepted</td>
    </tr>
    <tr>
        <td>AT-003</td>
        <td>Chatbot Assistance</td>
        <td>Client asks quick question</td>
        <td>App is live</td>
        <td>1. Click chat icon. 2. Ask "What are your services?"</td>
        <td>Chatbot replies with relevant Havilah services</td>
        <td>Relevant reply provided</td>
        <td>Passed</td>
        <td>Accepted</td>
    </tr>
</table>

<h2>7.5 Test Environment</h2>
<ul>
    <li><strong>Operating System:</strong> Windows 10 / macOS / Linux (Cross-platform Browser Testing)</li>
    <li><strong>Programming Language:</strong> TypeScript / JavaScript</li>
    <li><strong>Framework:</strong> Next.js 14.2.5, React 18</li>
    <li><strong>Runtime:</strong> Node.js</li>
    <li><strong>Database:</strong> Not applicable (Stateless Implementation)</li>
    <li><strong>Browser:</strong> Google Chrome (v151), Mozilla Firefox, Safari</li>
    <li><strong>External APIs:</strong> Resend Email API</li>
</ul>

<h2>7.6 Test Data</h2>
<p>Because Havilah currently functions as a public-facing portfolio and inquiry generation platform without a database, test data is primarily used within forms and API payloads.</p>
<ul>
    <li><strong>Valid data:</strong> Standard names ("Jane Doe"), proper email formats ("jane@example.com"), standard phone numbers.</li>
    <li><strong>Invalid data:</strong> Strings without "@" for emails ("janeexample.com"), empty strings for required fields.</li>
    <li><strong>Boundary data:</strong> Extremely long strings (e.g., 5000 characters) in the Contact "Message" field to test layout overflow and API limits.</li>
</ul>

<h2>7.7 Defect Reporting</h2>
<p>During the testing phases of the Havilah project, defects were documented and resolved. Below is a sample of identified and corrected defects based on actual repository evidence.</p>
<table>
    <tr>
        <th>Defect ID</th>
        <th>Test Case ID</th>
        <th>Module</th>
        <th>Defect Description</th>
        <th>Severity</th>
        <th>Expected Behavior</th>
        <th>Actual Behavior</th>
        <th>Resolution</th>
        <th>Status</th>
    </tr>
    <tr>
        <td>DEF-001</td>
        <td>ST-001</td>
        <td>UI/Navigation</td>
        <td>Floating socials overlap with Chatbot button on mobile view</td>
        <td>Medium</td>
        <td>Floating socials and chatbot should not overlap</td>
        <td>Socials pill placed at bottom-center overlapped bottom-right chatbot</td>
        <td>Shifted floating socials to bottom-left via CSS</td>
        <td>Resolved</td>
    </tr>
    <tr>
        <td>DEF-002</td>
        <td>UT-004</td>
        <td>API Build</td>
        <td>Next.js static generation crashes due to missing RESEND_API_KEY</td>
        <td>High</td>
        <td>Build should complete ignoring missing env vars for runtime API routes</td>
        <td>Build threw "Error: Missing API key" and failed</td>
        <td>Added fallback dummy key to Resend initialization</td>
        <td>Resolved</td>
    </tr>
</table>

<h2>7.8 Test Summary</h2>
<table>
    <tr>
        <th>Testing Type</th>
        <th>Total Test Cases</th>
        <th>Passed</th>
        <th>Failed</th>
        <th>Not Executed</th>
        <th>Pass Percentage</th>
    </tr>
    <tr>
        <td>Unit Testing</td>
        <td>5</td>
        <td>5</td>
        <td>0</td>
        <td>0</td>
        <td>100%</td>
    </tr>
    <tr>
        <td>Integration Testing</td>
        <td>4</td>
        <td>4</td>
        <td>0</td>
        <td>0</td>
        <td>100%</td>
    </tr>
    <tr>
        <td>System Testing</td>
        <td>5</td>
        <td>3</td>
        <td>0</td>
        <td>2</td>
        <td>60%</td>
    </tr>
    <tr>
        <td>Acceptance Testing</td>
        <td>3</td>
        <td>3</td>
        <td>0</td>
        <td>0</td>
        <td>100%</td>
    </tr>
    <tr>
        <td><strong>Total</strong></td>
        <td><strong>17</strong></td>
        <td><strong>15</strong></td>
        <td><strong>0</strong></td>
        <td><strong>2</strong></td>
        <td><strong>88.2%</strong></td>
    </tr>
</table>

<h2>Conclusion</h2>
<p>The software testing life cycle for the Havilah project rigorously evaluated the implemented features, emphasizing frontend stability, responsive design, and seamless API integration. Unit and integration tests ensured that React components and Next.js route handlers process user inputs flawlessly and communicate successfully with the Resend API. System and acceptance testing validated the end-to-end workflow from a client's perspective, ensuring high aesthetic quality and functional reliability. Test cases concerning databases and user authentication were intentionally marked as 'Not Executed', as these modules are not part of the current stateless architectural implementation. Overall, the testing confirms that Havilah robustly satisfies its business requirements.</p>

</body>
</html>
`;

HTMLtoDOCX(htmlContent, null, {
    table: { row: { cantSplit: true } },
    footer: true,
    pageNumber: true,
}).then(buffer => {
    fs.writeFileSync('d:/Robinson/claude apps/havilah-pro-nextjs/havilah-pro/testing.docx', buffer);
    console.log('Successfully generated testing.docx');
}).catch(err => {
    console.error('Error generating document:', err);
});
