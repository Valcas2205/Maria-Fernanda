import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Preview,
} from '@react-email/components';
import * as React from 'react';

interface OrderApprovedEmailProps {
  firstName: string;
  orderId: string;
  items: Array<{ name: string; quantity: number; price?: number }>;
  digitalItemsCount?: number;
  physicalItemsCount?: number;
}

export const OrderApprovedEmail: React.FC<Readonly<OrderApprovedEmailProps>> = ({
  firstName,
  orderId,
  items,
  digitalItemsCount = 0,
  physicalItemsCount = 0,
}) => {
  return (
    <Html>
      <Head />
      <Preview>¡Tu orden #{orderId.split('-')[0]} ha sido confirmada! 🎉</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>
            ¡Tu orden ha sido confirmada, {firstName}! 🎉
          </Heading>

          <Text style={textCentered}>
            El pago de tu orden <strong style={{ color: '#A7895C' }}>#{orderId.split('-')[0]}</strong> ha sido verificado con éxito.
          </Text>

          <Section style={alertCard}>
            <Heading as="h2" style={alertHeading}>¡Gracias por tu compra!🤎</Heading>
            {digitalItemsCount > 0 && physicalItemsCount > 0 ? (
              digitalItemsCount > 1 ? (
                <>
                  <Text style={alertText}>Estoy muy emocionada de que puedas obtener estas guías y productos que estoy segura te serán de mucha ayuda.</Text>
                  <Text style={alertText}>Abajo encontrarás los documentos para descargarlos y comenzarlos a disfrutar... Mientras tanto, organizaremos todo para que tengas nuestro producto estrella en tus manos lo antes posible.</Text>
                  <Text style={alertTextLast}>No olvides que con tu compra estás aportando un 10% a las familias afectadas por el terremoto en Venezuela✨</Text>
                </>
              ) : (
                <>
                  <Text style={alertText}>Estoy muy emocionada de que puedas obtener estas guías y productos que estoy segura te serán de mucha ayuda.</Text>
                  <Text style={alertText}>Abajo encontrarás el documento para descargarlo y comenzarlo a disfrutar... Mientras tanto, organizaremos todo para que tengas nuestro producto estrella en tus manos lo antes posible.</Text>
                  <Text style={alertTextLast}>No olvides que con tu compra estás aportando un 10% a las familias afectadas por el terremoto en Venezuela✨</Text>
                </>
              )
            ) : digitalItemsCount > 1 && physicalItemsCount === 0 ? (
              <>
                <Text style={alertText}>Estoy muy emocionada de que puedas obtener estas guías que estoy segura te serán de mucha ayuda.</Text>
                <Text style={alertText}>Abajo encontrarás los documentos para descargarlos y comenzarlos a disfrutar.</Text>
                <Text style={alertTextLast}>No olvides que con tu compra estás aportando un 10% a las familias afectadas por el terremoto en Venezuela✨</Text>
              </>
            ) : digitalItemsCount === 1 && physicalItemsCount === 0 ? (
              <>
                <Text style={alertText}>Estoy muy emocionada de que puedas obtener esta guía que estoy segura te será de mucha ayuda.</Text>
                <Text style={alertText}>Abajo encontrarás el documento para descargarlo y comenzarlo a disfrutar.</Text>
                <Text style={alertTextLast}>No olvides que con tu compra estás aportando un 10% a las familias afectadas por el terremoto en Venezuela✨</Text>
              </>
            ) : (
              <>
                <Text style={alertText}>Estoy muy emocionada de hacerte llegar este producto que estoy segura te será de mucha ayuda.</Text>
                <Text style={alertText}>Empezaremos a organizar todo para que lo tengas en tus manos lo antes posible.</Text>
                <Text style={alertTextLast}>No olvides que con tu compra estás aportando un 10% a las familias afectadas por el terremoto en Venezuela✨</Text>
              </>
            )}
          </Section>

          <Heading as="h3" style={subheading}>Resumen de lo que adquiriste</Heading>

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

          <Hr style={hr} />

          <Text style={footerText}>
            Si no recibes el material en las próximas 24 horas o tienes alguna duda, responde a este correo y te ayudaremos con mucho gusto.
          </Text>

          <Text style={footer}>
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
  fontSize: '28px',
  fontWeight: 'normal',
  textAlign: 'center' as const,
  margin: '0 0 10px',
};

const textCentered = {
  color: '#5c4b32',
  fontSize: '16px',
  textAlign: 'center' as const,
  margin: '0 0 30px',
};

const alertCard = {
  backgroundColor: '#fdfbf7',
  padding: '24px',
  borderRadius: '8px',
  marginBottom: '30px',
  border: '1px solid #e8e1d5',
  textAlign: 'center' as const,
};

const alertHeading = {
  margin: '0 0 16px 0',
  color: '#A7895C',
  fontSize: '20px',
  fontWeight: 'bold',
};

const alertText = {
  margin: '0 0 16px 0',
  color: '#5c4b32',
  fontSize: '15px',
  lineHeight: '22px',
  textAlign: 'center' as const,
};

const alertTextLast = {
  ...alertText,
  margin: '0',
};

const subheading = {
  color: '#5c4b32',
  fontSize: '20px',
  fontWeight: 'normal',
  marginTop: '10px',
  marginBottom: '15px',
  borderBottom: '1px solid #eaeaea',
  paddingBottom: '10px',
};

const itemsList = {
  marginBottom: '15px',
};

const itemRow = {
  color: '#5c4b32',
  fontSize: '16px',
  margin: '12px 0',
};

const itemQuantity = {
  color: '#A7895C',
  fontWeight: 'bold',
  marginRight: '8px',
};

const hr = {
  borderColor: '#eaeaea',
  margin: '35px 0 20px',
};

const footerText = {
  color: '#8b7c66',
  fontSize: '14px',
  textAlign: 'center' as const,
  lineHeight: '20px',
  margin: '0 0 20px',
};

const footer = {
  color: '#b3a89b',
  fontSize: '13px',
  textAlign: 'center' as const,
};
