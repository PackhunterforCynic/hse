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
} from "@react-email/components";

interface AppointmentEmailProps {
  name: string;
  email: string;
  mobile: string;
  service: string;
  date: string;
  time: string;
  notes: string;
}

export const AppointmentEmail = ({
  name,
  email,
  mobile,
  service,
  date,
  time,
  notes,
}: AppointmentEmailProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerTitle}>HAVILAH PRO</Heading>
            <Text style={headerSubtitle}>New Booking Request</Text>
          </Section>
          
          <Section style={content}>
            <Heading style={h2}>Client Details</Heading>
            <Text style={text}><strong>Name:</strong> {name}</Text>
            <Text style={text}><strong>Email:</strong> {email}</Text>
            <Text style={text}><strong>Mobile:</strong> {mobile}</Text>

            <Hr style={hr} />

            <Heading style={h2}>Booking Details</Heading>
            <Text style={text}><strong>Service:</strong> {service}</Text>
            <Text style={text}><strong>Requested Date:</strong> {date}</Text>
            <Text style={text}><strong>Requested Time:</strong> {time}</Text>
            
            {notes && (
              <>
                <Hr style={hr} />
                <Heading style={h2}>Additional Notes</Heading>
                <Text style={messageBox}>
                  {notes}
                </Text>
              </>
            )}
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

export default AppointmentEmail;

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
