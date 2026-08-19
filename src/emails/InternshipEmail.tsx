import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Button,
} from "@react-email/components";

interface InternshipEmailProps {
  fullName: string;
  email: string;
  phone: string;
  track: string;
  fieldOfStudy: string;
  experience: string;
  pitch: string;
  portfolioUrl: string;
}

export const InternshipEmail = ({
  fullName,
  email,
  phone,
  track,
  fieldOfStudy,
  experience,
  pitch,
  portfolioUrl,
}: InternshipEmailProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerTitle}>HAVILAH ACADEMY</Heading>
            <Text style={headerSubtitle}>New Internship Application</Text>
          </Section>
          
          <Section style={content}>
            <Heading style={h2}>Applicant Details</Heading>
            <Text style={text}><strong>Name:</strong> {fullName}</Text>
            <Text style={text}><strong>Email:</strong> {email}</Text>
            <Text style={text}><strong>Phone:</strong> {phone}</Text>

            <Hr style={hr} />

            <Heading style={h2}>Program Preferences</Heading>
            <Text style={text}><strong>Track:</strong> {track}</Text>
            <Text style={text}><strong>Field of Study:</strong> {fieldOfStudy}</Text>
            <Text style={text}><strong>Experience Level:</strong> {experience}</Text>
            
            <Hr style={hr} />

            <Heading style={h2}>Links & Documents</Heading>
            <Text style={text}><strong>Portfolio URL:</strong> <a href={portfolioUrl} style={link}>{portfolioUrl}</a></Text>
            <Text style={text}><strong>Resume/CV:</strong> Attached File</Text>

            <Heading style={h2}>The Pitch</Heading>
            <Text style={messageBox}>
              {pitch}
            </Text>

            <Hr style={hr} />
            <Section style={actionsSection}>
              <Button href={`mailto:${email}`} style={replyButton}>
                Reply to Applicant
              </Button>
              {phone && (
                <Button href={`tel:${phone}`} style={callButton}>
                  Call Applicant
                </Button>
              )}
            </Section>
          </Section>
          
          <Section style={footer}>
            <Text style={footerText}>
              Sent securely via Havilah Pro Automated Systems.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default InternshipEmail;

const main = {
  backgroundColor: "#000000",
  fontFamily:
    "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif",
  padding: "40px 0",
};

const container = {
  margin: "0 auto",
  padding: "0",
  backgroundColor: "#0a0a0a",
  border: "1px solid #222222",
  borderRadius: "8px",
  width: "600px",
  maxWidth: "100%",
};

const header = {
  padding: "40px 30px 20px",
  textAlign: "center" as const,
  borderBottom: "1px solid #222222",
};

const headerTitle = {
  color: "#c9a84c", // Gold accent
  fontSize: "28px",
  fontWeight: "bold",
  margin: "0 0 10px",
  letterSpacing: "4px",
};

const headerSubtitle = {
  color: "#888888",
  fontSize: "12px",
  textTransform: "uppercase" as const,
  letterSpacing: "2px",
  margin: "0",
};

const content = {
  padding: "30px",
};

const h2 = {
  color: "#ffffff",
  fontSize: "18px",
  fontWeight: "600",
  margin: "15px 0",
};

const text = {
  color: "#cccccc",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 10px",
};

const link = {
  color: "#c9a84c",
  textDecoration: "underline",
};

const messageBox = {
  backgroundColor: "#111111",
  border: "1px solid #222222",
  borderRadius: "6px",
  padding: "20px",
  color: "#eeeeee",
  fontSize: "15px",
  lineHeight: "1.6",
  whiteSpace: "pre-wrap" as const,
};

const hr = {
  borderColor: "#222222",
  margin: "25px 0",
};

const footer = {
  padding: "20px 30px",
  backgroundColor: "#050505",
  borderTop: "1px solid #222222",
  borderBottomLeftRadius: "8px",
  borderBottomRightRadius: "8px",
};

const footerText = {
  color: "#666666",
  fontSize: "12px",
  textAlign: "center" as const,
  margin: "0",
};

const actionsSection = {
  textAlign: "center" as const,
  marginTop: "20px",
  marginBottom: "10px",
};

const replyButton = {
  backgroundColor: "#c9a84c",
  color: "#000000",
  fontWeight: "bold",
  fontSize: "14px",
  padding: "12px 24px",
  borderRadius: "4px",
  textDecoration: "none",
  marginRight: "10px",
  display: "inline-block",
};

const callButton = {
  backgroundColor: "#222222",
  color: "#ffffff",
  fontWeight: "bold",
  fontSize: "14px",
  padding: "12px 24px",
  borderRadius: "4px",
  textDecoration: "none",
  display: "inline-block",
  border: "1px solid #444444",
};
