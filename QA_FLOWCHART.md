# Flujo de Experiencia de Compra (QA & Negocio)

Este diagrama documenta la experiencia de compra desde la perspectiva del cliente y del administrador. Está diseñado para entender funcionalmente qué ocurre en cada paso sin entrar en detalles técnicos.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'fontFamily': 'Arial, sans-serif'}}}%%
flowchart TD
    classDef cliente fill:#E0F2FE,stroke:#0284C7,stroke-width:2px,color:#0F427A,font-weight:bold
    classDef sistema fill:#FEF3C7,stroke:#D97706,stroke-width:2px,color:#92400E,font-weight:bold
    classDef notificacion fill:#D1FAE5,stroke:#059669,stroke-width:2px,color:#065F46,font-weight:bold
    classDef admin fill:#F3F4F6,stroke:#4B5563,stroke-width:2px,color:#1F2937,font-weight:bold
    classDef accion fill:#FEE2E2,stroke:#DC2626,stroke-width:2px,color:#991B1B,font-weight:bold

    subgraph "1️⃣ El Cliente inicia su compra"
        C1("🛍️ Agrega productos al Carrito"):::cliente
        C2("📖 Compra Rápida: Libro Físico"):::cliente
        C3("💆‍♀️ Compra Rápida: Terapias"):::cliente
    end

    subgraph "2️⃣ Checkout y Reporte de Pago"
        F1("📝 Completa sus datos personales (Nombre, Correo)"):::cliente
        F2("🧾 Registra su referencia de Zelle/Pago Móvil"):::cliente
        
        C1 --> F1
        C2 --> F1
        C3 --> F1
        F1 --> F2
    end

    subgraph "3️⃣ El Sistema registra la Orden"
        S1("💾 Guarda al Cliente en la Lista de Contactos (Resend)"):::sistema
        S2("⏳ Crea la orden en estado 'Verificando'"):::sistema

        F2 -->|"Confirma el pago"| S1
        S1 --> S2
    end

    subgraph "🔌 Módulo Futuro: Banco Plaza (Conciliación Automática)"
        BP1("🤖 Robot de WaaS consulta la referencia en el Banco"):::banco
        BP2{"¿El banco confirma el pago?"}
        BP3("✔️ Sí: Se auto-aprueba (Salta al paso 6)"):::banco
        BP4("⏳ No: Reintenta más tarde en background"):::banco
        BP5("❌ Falla definitiva: Requiere revisión humana"):::banco

        BP1 --> BP2
        BP2 -->|"Match exacto"| BP3
        BP2 -->|"No encontrado"| BP4
        BP4 -.->|"Sigue sin aparecer (Timeout)"| BP5
    end

    subgraph "4️⃣ Notificaciones Inmediatas"
        N1("✉️ Correo al Cliente:\n'Tu pago está en verificación ⏳'"):::notificacion
        N2("📱 WhatsApp al Administrador:\n'Nueva orden requiere validación'"):::notificacion
        N3("✉️ Correo al Administrador:\nDetalles completos de la orden"):::notificacion

        S2 -.->|"Al instante"| N1
        S2 -.->|"En background"| BP1
        
        %% Conexión de falla del banco a la notificación humana
        BP5 -.->|"Notifica al Admin"| N2
        BP5 -.->|"Notifica al Admin"| N3
    end

    subgraph "5️⃣ Validación Humana (Panel de Administración)"
        A1("👤 Administrador revisa su cuenta bancaria manualmente"):::admin
        A2("✅ Administrador ubica la orden y hace clic en 'Aprobar'"):::accion

        N2 -.->|"Aviso"| A1
        N3 -.->|"Aviso"| A1
        A1 --> A2
    end

    subgraph "6️⃣ Confirmación Final"
        S3("✔️ El Sistema actualiza la orden como 'Aprobada'"):::sistema
        N4("🎉 Correo al Cliente:\n'¡Orden Confirmada! Aquí tienes tus accesos'"):::notificacion
        N5("📱 WhatsApp al Admin:\n'✅ Venta Automática Exitosa'"):::notificacion

        A2 -->|"Aprueba manualmente"| S3
        BP3 -.->|"Aprueba automáticamente"| S3
        
        S3 -.->|"Automático"| N4
        BP3 -.->|"Notifica éxito sin esfuerzo"| N5
    end
```
