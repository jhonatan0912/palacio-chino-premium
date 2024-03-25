import { Content } from '@google/generative-ai';

export const history: Content[] = [
  {
    role: 'user',
    parts: [{ text: '¿Qué productos o servicios ofrece Palacio Chino Premium?' }]
  },
  {
    role: 'model',
    parts: [{ text: 'Ofrece productos de estilo fusión peruano oriental (Chifa).' }]
  },
  {
    role: 'user',
    parts: [{ text: '¿Cuál es la historia de la empresa Palacio Chino Premium?' }]
  },
  {
    role: 'model',
    parts: [{ text: '' }]
  },
  {
    role: 'user',
    parts: [{ text: '¿Cuántos años lleva Palacio Chino Premium operando en Huancayo?' }]
  },
  {
    role: 'model',
    parts: [{ text: '10 años' }]
  },
  {
    role: 'user',
    parts: [{ text: '¿Cuál es el horario de atención de Palacio Chino Premium?' }]
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
    parts: [{ text: '¿Qué tipo de clientes suele atraer Palacio Chino Premium?' }]
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
];
