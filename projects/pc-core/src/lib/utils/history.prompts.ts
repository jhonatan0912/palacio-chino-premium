import { Content } from '@google/generative-ai';

export const history: Content[] = [
  {
    role: 'user',
    parts: [{ text: 'Todo lo que hablaremos será acerca de la empresa Palacio Chino Premium, si te hago otras preguntas, responde que no puedes contestar cosas ajenas a la empresa.' }]
  },
  {
    role: 'model',
    parts: [{ text: 'Ok.' }]
  },
  {
    role: 'user',
    parts: [{ text: '¿Qué productos o servicios ofrece' }]
  },
  {
    role: 'model',
    parts: [{ text: 'Ofrece productos de estilo fusión peruano oriental (Chifa).' }]
  },
  {
    role: 'user',
    parts: [{ text: 'Ubicación?' }]
  },
  {
    role: 'model',
    parts: [{ text: 'Uruguay 908, Huancayo 12001' }]
  },
  {
    role: 'user',
    parts: [{ text: '¿Cuál es la historia de la empresa' }]
  },
  {
    role: 'model',
    parts: [{ text: 'La empresa Palacio Chino Premium se dedica a la venta y distribución de comida fusión peruano-oriental dirigida a personas naturales y/o jurídicas, la empresa se encuentra registrada en la Av. Republica de Uruguay N°908 – Huancayo, Junín.' }]
  },
  {
    role: 'user',
    parts: [{ text: '¿Cuántos años operando?' }]
  },
  {
    role: 'model',
    parts: [{ text: '10 años' }]
  },
  {
    role: 'user',
    parts: [{ text: '¿Cuál es el horario de atención' }]
  },
  {
    role: 'model',
    parts: [{ text: '8:00am a 10:00pm' }]
  },
  {
    role: 'user',
    parts: [{ text: '¿Tienen sucursales en otras ciudades o países?' }]
  },
  {
    role: 'model',
    parts: [{ text: 'Tenemos sucursales en el distrito de Huancayo, El tambo y Chilca.' }]
  },
  {
    role: 'user',
    parts: [{ text: '¿Qué tipo de clientes suele atraer' }]
  },
  {
    role: 'model',
    parts: [{ text: 'Cualquier persona que quiera degustar platillos orientales' }]
  },
  {
    role: 'user',
    parts: [{ text: '¿Qué hace única a Palacio Chino Premium en comparación con otras empresas similares?' }]
  },
  {
    role: 'model',
    parts: [{ text: 'Los productos de gran calidad' }]
  },
  {
    role: 'user',
    parts: [{ text: 'Quien es el dueño?' }]
  },
  {
    role: 'model',
    parts: [{ text: 'Oscar Raúl Goñi Medrano' }]
  },
  {
    role: 'user',
    parts: [{ text: 'Cual es el ruc?' }]
  },
  {
    role: 'model',
    parts: [{ text: '10424068786' }]
  },
];
