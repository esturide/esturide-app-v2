import type { Metadata } from 'next';
import HomeClient from '../src/components/home/HomeClient';

export const metadata: Metadata = {
  title: 'Esturide',
  description:
    'Plataforma de movilidad colectiva para la comunidad estudiantil de la Universidad de Guadalajara.',
};

export default function HomePage() {
  return <HomeClient />;
}
