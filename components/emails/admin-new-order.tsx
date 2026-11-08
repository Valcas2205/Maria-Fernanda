import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Button,
  Hr,
  Link,
  Preview,
} from '@react-email/components';
import * as React from 'react';

interface AdminNewOrderEmailProps {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethod: string;
  amountUsd: number;
  amountVes: number | null;
  items: Array<{ name: string; quantity: number }>;
  paymentReference: string;
  adminUrl: string;
}

export const AdminNewOrderEmail: React.FC<Readonly<AdminNewOrderEmailProps>> = ({
  orderId,
  customerName,
  customerEmail,
  customerPhone,
  paymentMethod,
  amountUsd,
  amountVes,
  items,
  paymentReference,
  adminUrl,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Nueva Orden Recibida: {orderId}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>
            <span style={{ fontSize: '24px', marginRight: '8px' }}>🔔</span> 
            Nueva Orden Recibida
          </Heading>
          
          <Text style={text}>
            Se ha registrado un nuevo pedido en la tienda. A continuación los detalles para la validación:
          </Text>

          <Section style={card}>
            <Text style={cardText}><strong>ID Orden:</strong> {orderId}</Text>
            <Text style={cardText}><strong>Cliente:</strong> {customerName}</Text>
            <Text style={cardText}><strong>Correo:</strong> <Link href={`mailto:${customerEmail}`} style={link}>{customerEmail}</Link></Text>
            <Text style={cardText}><strong>Teléfono:</strong> {customerPhone}</Text>
          </Section>

          <Section style={paymentCard}>
            <Text style={paymentHeading}>Detalles del Pago</Text>
            <Text style={cardText}><strong>Método:</strong> <span style={{ textTransform: 'capitalize' }}>{paymentMethod}</span></Text>
            <Text style={cardText}><strong>Referencia:</strong> {paymentReference}</Text>
            <Text style={cardText}><strong>Monto USD:</strong> ${amountUsd.toFixed(2)}</Text>
            {amountVes && <Text style={cardText}><strong>Monto Bs:</strong> Bs {amountVes.toFixed(2)}</Text>}
          </Section>

          <Heading as="h3" style={subheading}>Artículos Comprados</Heading>
          <Section style={itemsList}>
            {items && items.length > 0 ? (
              items.map((item, i) => (
                <Text key={i} style={itemRow}>
                  <span style={itemQuantity}>{item.quantity}x</span> {item.name}
                </Text>
              ))
            ) : (
              <Text style={itemRow}>1x Suscripción / Servicio Digital</Text>
            )}
          </Section>

          <Section style={buttonContainer}>
            <Button href={adminUrl} style={button}>
              Ver en el Dashboard
            </Button>
          </Section>

          <Hr style={hr} />
          
          <Text style={footer}>
            Notificación automática del Sistema WaaS <br/>
            Todo es un Balance © {new Date().getFullYear()}
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#f9f6f0',
  fontFamily: 'Georgia, "Times New Roman", Times, serif',
  padding: '40px 0',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #e5e5e5',
  borderRadius: '12px',
  margin: '0 auto',
  padding: '40px',
  maxWidth: '600px',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
};

const heading = {
  color: '#5c4b32',
  fontSize: '26px',
  fontWeight: 'normal',
  textAlign: 'center' as const,
  margin: '0 0 20px',
  paddingBottom: '20px',
  borderBottom: '1px solid #eaeaea',
};

const text = {
  color: '#5c4b32',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 24px',
};

const card = {
  backgroundColor: '#fafafa',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '20px',
  border: '1px solid #eaeaea',
};

const paymentCard = {
  backgroundColor: '#fdfbf7',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '24px',
  border: '1px solid #e8e1d5',
};

const paymentHeading = {
  margin: '0 0 15px 0',
  color: '#A7895C',
  fontSize: '18px',
  fontWeight: 'bold',
};

const cardText = {
  margin: '8px 0',
  color: '#5c4b32',
  fontSize: '15px',
};

const subheading = {
  color: '#5c4b32',
  fontSize: '20px',
  fontWeight: 'normal',
  marginTop: '30px',
  marginBottom: '15px',
};

const itemsList = {
  marginBottom: '30px',
  borderLeft: '3px solid #A7895C',
  paddingLeft: '15px',
};

const itemRow = {
  color: '#5c4b32',
  fontSize: '16px',
  margin: '8px 0',
};

const itemQuantity = {
  color: '#A7895C',
  fontWeight: 'bold',
  marginRight: '8px',
};

const link = {
  color: '#A7895C',
  textDecoration: 'underline',
};

const buttonContainer = {
  textAlign: 'center' as const,
  marginTop: '40px',
  marginBottom: '20px',
};

const button = {
  backgroundColor: '#A7895C',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 28px',
  fontWeight: 'bold',
  fontFamily: 'Arial, sans-serif',
};

const hr = {
  borderColor: '#eaeaea',
  margin: '30px 0',
};

const footer = {
  color: '#9ca3af',
  fontSize: '13px',
  lineHeight: '20px',
  textAlign: 'center' as const,
};
