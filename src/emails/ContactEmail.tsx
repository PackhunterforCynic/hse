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

interface ContactEmailProps {
  name: string;
  email: string;
  phone?: string;
  service: string;
  subService?: string;
  budget?: string;
  message: string;
}

export const ContactEmail = ({
  name,
  email,
  phone,
  service,
  subService,
  budget,
  message,
}: ContactEmailProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerTitle}>HAVILAH</Heading>
            <Text style={headerSubtitle}>New Inquiry Received</Text>
          </Section>
          
          <Section style={content}>
            <Heading style={h2}>Client Details</Heading>
            <Text style={text}><strong>Name:</strong> {name}</Text>
            <Text style={text}><strong>Email:</strong> {email}</Text>
            {phone && <Text style={text}><strong>Phone:</strong> {phone}</Text>}

            <Hr style={hr} />

            <Heading style={h2}>Project Requirements</Heading>
            <Text style={text}><strong>Primary Service:</strong> {service}</Text>
            {subService && <Text style={text}><strong>Specific Type:</strong> {subService}</Text>}
            {budget && budget !== "N/A" && <Text style={text}><strong>Budget Estimate:</strong> {budget}</Text>}
            
            <Heading style={h2}>Message / Brief</Heading>
            <Text style={messageBox}>
              {message}
            </Text>

            <Hr style={hr} />
            <Section style={actionsSection}>
              <Button href={`mailto:${email}`} style={replyButton}>
                Reply to Client
              </Button>
              {phone && (
                <Button href={`tel:${phone}`} style={callButton}>
                  Call Client
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

export default ContactEmail;

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
  margin: "0 0 15px",
};

const text = {
  color: "#cccccc",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 10px",
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
