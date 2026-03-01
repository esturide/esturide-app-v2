'use client';

import React from 'react';
import MarketingHeader, { MarketingNavItem } from './MarketingHeader';
import MarketingFooter, { FooterColumn } from './MarketingFooter';

function SectionTitle({ children }: React.PropsWithChildren) {
  return (
    <h2 className="text-[22px] font-semibold text-[#0C4A6E] tracking-tight">
      {children}
    </h2>
  );
}

function PageTitle({ children }: React.PropsWithChildren) {
  return (
    <h1 className="text-[34px] font-medium text-slate-900 tracking-tight">
      {children}
    </h1>
  );
}

function BodyText({ children }: React.PropsWithChildren) {
  return <p className="text-[14px] leading-6 text-slate-700">{children}</p>;
}

function EmText({ children }: React.PropsWithChildren) {
  return (
    <p className="text-[14px] leading-6 text-slate-700 italic">{children}</p>
  );
}

type Bullet = {
  title: string;
  content: string;
};

function BulletList({ items }: { items: readonly Bullet[] }) {
  return (
    <ul className="mt-4 flex flex-col gap-3 list-disc pl-5">
      {items.map(item => (
        <li key={item.title} className="text-[14px] leading-6 text-slate-700">
          <span className="font-semibold text-slate-900">{item.title}</span>{' '}
          {item.content}
        </li>
      ))}
    </ul>
  );
}

export default function HomeClient() {
  const navItems: readonly MarketingNavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '#beneficios' },
    { label: 'Pricing', href: '#como-funciona' },
    { label: 'Contact', href: '#contacto' },
  ] as const;

  const footerColumns: readonly FooterColumn[] = [
    {
      title: 'Compañia',
      links: [
        { label: 'Quiénes somos', href: '#quienes-somos' },
        { label: 'Beneficios', href: '#beneficios' },
        { label: 'Acerca de', href: '#acerca-de' },
      ],
    },
    {
      title: 'Producto',
      links: [
        { label: 'Cómo funciona', href: '#como-funciona' },
        { label: 'Misión', href: '#mision' },
        { label: 'Objetivos', href: '#objetivos' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacidad', href: '/privacy' },
        { label: 'Términos', href: '/terms' },
        { label: 'Accesibilidad', href: '/accessibility' },
      ],
    },
  ] as const;

  return (
    <div className="min-h-screen bg-white">
      <MarketingHeader
        navItems={navItems}
        primaryCta={{ label: 'Sign Up', href: '/login/register' }}
        secondaryCta={{ label: 'Login', href: '/login' }}
      />

      <main>
        <div className="mx-auto max-w-5xl px-6 py-14">
          <article className="max-w-2xl">
            <PageTitle>Esturide</PageTitle>

            <section id="quienes-somos" className="mt-10 scroll-mt-24">
              <SectionTitle>¿Quiénes somos?</SectionTitle>
              <div className="mt-4 flex flex-col gap-4">
                <BodyText>
                  <span className="font-semibold text-slate-900">Esturide</span>{' '}
                  nació en 2022, impulsado por estudiantes de la UDG que
                  entendieron que el camino a la universidad no debería ser una
                  barrera, sino una oportunidad.
                </BodyText>

                <BodyText>
                  Somos una plataforma de{' '}
                  <span className="font-semibold text-slate-900">
                    CommuterTech
                  </span>{' '}
                  con alma de red social: una herramienta tecnológica diseñada
                  exclusivamente para la comunidad estudiantil de la Universidad
                  de Guadalajara que transforma el traslado diario en una
                  experiencia compartida, segura y económica.
                </BodyText>
              </div>
            </section>

            <section id="mision" className="mt-10 scroll-mt-24">
              <SectionTitle>Nuestra misión</SectionTitle>
              <div className="mt-4">
                <EmText>
                  Conectar a los estudiantes de la UDG a través de la movilidad
                  colectiva, transformando el trayecto universitario en una
                  oportunidad de ahorro, seguridad y construcción de comunidad,
                  mientras contribuimos activamente a la sostenibilidad ambiental
                  de nuestra ciudad.
                </EmText>
              </div>
            </section>

            <section className="mt-10" id="metas">
              <SectionTitle>Nuestras metas</SectionTitle>
              <BulletList
                items={[
                  {
                    title: 'Expansión universitaria:',
                    content:
                      'Llevar Esturide a todos los Centros Universitarios de la UDG (CUCEI, CUCSH, CUAAD, entre otros), creando una red de movilidad integral para toda la comunidad estudiantil.',
                  },
                  {
                    title: 'Descarbonización:',
                    content:
                      'Evitar la emisión de 100 toneladas de CO₂ anuales al reducir vehículos individuales en la vía.',
                  },
                  {
                    title: 'Comunidad viva:',
                    content:
                      'Convertir los viajes diarios en espacios de networking académico, apoyo mutuo y construcción de amistades reales.',
                  },
                ]}
              />
            </section>

            <section id="objetivos" className="mt-10 scroll-mt-24">
              <SectionTitle>Nuestros objetivos</SectionTitle>
              <ol className="mt-4 flex flex-col gap-3 list-decimal pl-6">
                <li className="text-[14px] leading-6 text-slate-700">
                  <span className="font-semibold text-slate-900">
                    Democratizar el acceso a la universidad
                  </span>{' '}
                  Eliminar barreras económicas y logísticas que impidan a los
                  estudiantes asistir puntualmente a sus clases, garantizando
                  que el costo del transporte nunca sea motivo de deserción.
                </li>
                <li className="text-[14px] leading-6 text-slate-700">
                  <span className="font-semibold text-slate-900">
                    Colectivizar la movilidad estudiantil
                  </span>{' '}
                  Optimizar los asientos vacíos de los vehículos que ya circulan
                  hacia la universidad, maximizando la eficiencia del transporte
                  existente sin necesidad de más autos en la calle.
                </li>
                <li className="text-[14px] leading-6 text-slate-700">
                  <span className="font-semibold text-slate-900">
                    Fortalecer el tejido social universitario
                  </span>{' '}
                  Romper el aislamiento del trayecto individual para crear redes
                  de apoyo entre compañeros de carrera, semestre o intereses
                  afines.
                </li>
                <li className="text-[14px] leading-6 text-slate-700">
                  <span className="font-semibold text-slate-900">
                    Garantizar seguridad compartida
                  </span>{' '}
                  Ofrecer una alternativa confiable al transporte público
                  sobrecargado o a plataformas de ride-sharing genéricas,
                  asegurando que cada viaje sea entre miembros verificados de la
                  comunidad UDG.
                </li>
                <li className="text-[14px] leading-6 text-slate-700">
                  <span className="font-semibold text-slate-900">
                    Impulsar la conciencia ambiental
                  </span>{' '}
                  Convertir cada viaje compartido en una acción concreta de
                  cuidado por el entorno de Guadalajara y Tonalá.
                </li>
              </ol>
            </section>

            <section id="beneficios" className="mt-14 scroll-mt-24">
              <h2 className="text-[28px] font-semibold tracking-tight text-[#0C4A6E]">
                Beneficios
              </h2>

              <section className="mt-8">
                <h3 className="text-[18px] font-semibold text-[#0C4A6E]">
                  Accesibilidad y ahorro real
                </h3>
                <BulletList
                  items={[
                    {
                      title: 'Divide el costo, multiplica el valor:',
                      content:
                        'Al compartir el viaje con compañeros que van al mismo instituto, reduces tu gasto de transporte hasta en un 50% comparado con servicios de transporte privado tradicionales.',
                    },
                    {
                      title: 'Sin intermediarios costosos:',
                      content:
                        'Modelo peer-to-peer que elimina comisiones abusivas y se ajusta al presupuesto estudiantil.',
                    },
                    {
                      title: 'Rutas flexibles:',
                      content:
                        'Desde zonas residenciales o puntos intermedios que el transporte público no cubre eficientemente hasta la puerta de tu centro universitario.',
                    },
                  ]}
                />
              </section>

              <section className="mt-10">
                <h3 className="text-[18px] font-semibold text-[#0C4A6E]">
                  Confianza y comunidad
                </h3>
                <BulletList
                  items={[
                    {
                      title: 'Red verificada:',
                      content:
                        'Todos los usuarios son estudiantes activos de la UDG con credencial vigente. Viajas con compañeros, no con extraños.',
                    },
                    {
                      title: 'Match inteligente:',
                      content:
                        'Nuestro algoritmo conecta estudiantes del mismo centro universitario, carrera o zona geográfica, facilitando conversaciones y vínculos académicos.',
                    },
                    {
                      title: 'Red de apoyo:',
                      content:
                        'Convierte el tiempo de traslado en oportunidades para formar grupos de estudio, compartir apuntes o simplemente encontrar alguien que entienda la vida universitaria.',
                    },
                  ]}
                />
              </section>

              <section className="mt-10">
                <h3 className="text-[18px] font-semibold text-[#0C4A6E]">
                  Impacto ambiental y social
                </h3>
                <BulletList
                  items={[
                    {
                      title: 'Huella verde:',
                      content:
                        'Cada viaje compartido representa un auto menos circulando, reduciendo emisiones de CO₂ y congestión vial en Guadalajara y Tonalá.',
                    },
                    {
                      title: 'Inclusión social:',
                      content:
                        'Facilita el acceso a la educación superior para estudiantes de zonas periféricas o con recursos limitados.',
                    },
                    {
                      title: 'Cultura colaborativa:',
                      content:
                        'Promovemos una economía del compartir que fortalece la solidaridad estudiantil frente al individualismo del transporte tradicional.',
                    },
                  ]}
                />
              </section>
            </section>

            <section id="acerca-de" className="mt-14 scroll-mt-24">
              <h2 className="text-[22px] font-semibold tracking-tight text-[#0C4A6E]">
                Acerca de Esturide
              </h2>
              <div className="mt-4 flex flex-col gap-4">
                <BodyText>
                  <span className="font-semibold text-slate-900">Esturide</span>{' '}
                  es más que una app de transporte: somos una respuesta
                  estudiantil a problemas reales.
                </BodyText>
                <BodyText>
                  Surgimos en el CUTONALA en 2022 cuando un grupo de compañeros se
                  dio cuenta de que muchos viajaban solos en rutas idénticas,
                  gastando dinero que podía destinarse a materiales de estudio o
                  alimentos, mientras otros luchaban por llegar a clase por falta
                  de transporte accesible.
                </BodyText>
              </div>
            </section>

            <section id="como-funciona" className="mt-10 scroll-mt-24">
              <h2 className="text-[22px] font-semibold tracking-tight text-[#0C4A6E]">
                Cómo funciona
              </h2>
              <div className="mt-4">
                <BodyText>
                  Nuestra plataforma opera bajo un modelo{' '}
                  <span className="font-semibold text-slate-900">
                    "planificado y compartido"
                  </span>
                  :
                </BodyText>
              </div>
              <ol className="mt-4 flex flex-col gap-3 list-decimal pl-6">
                <li className="text-[14px] leading-6 text-slate-700">
                  <span className="font-semibold text-slate-900">
                    El conductor-estudiante
                  </span>{' '}
                  programa su viaje hacia su centro universitario (CUTONALA,
                  CUCEI, etc.) indicando hora de salida y ruta.
                </li>
                <li className="text-[14px] leading-6 text-slate-700">
                  <span className="font-semibold text-slate-900">
                    El pasajero
                  </span>{' '}
                  busca viajes disponibles a su mismo instituto y solicita unirse
                  si la ruta coincide.
                </li>
                <li className="text-[14px] leading-6 text-slate-700">
                  <span className="font-semibold text-slate-900">
                    Match confirmado:
                  </span>{' '}
                  Ambos reciben detalles del encuentro, costo compartido (justo y
                  transparente) y datos de contacto.
                </li>
                <li className="text-[14px] leading-6 text-slate-700">
                  <span className="font-semibold text-slate-900">
                    Viaje y comunidad:
                  </span>{' '}
                  El traslado se convierte en un espacio de intercambio entre
                  quienes comparten no solo ruta, también objetivos académicos.
                </li>
              </ol>
            </section>

            <section className="mt-10" id="filosofia">
              <SectionTitle>Nuestra filosofía</SectionTitle>
              <div className="mt-4 flex flex-col gap-4">
                <BodyText>
                  Creemos que la tecnología debe servir para acercar personas, no
                  aislarlas. En Esturide, cada kilómetro recorrido es una
                  oportunidad de construir la universidad que soñamos: más
                  conectada, sostenible y humana.
                </BodyText>
                <BodyText>
                  <span className="font-semibold text-slate-900">
                    De estudiantes, para estudiantes. De la UDG, para nuestra
                    ciudad.
                  </span>
                </BodyText>
                <EmText>
                  ¿Listo para transformar tu trayecto universitario? Únete a la
                  comunidad que se mueve junta.
                </EmText>

                <div id="contacto" className="pt-2">
                  <a
                    href="/login/register"
                    className="inline-flex items-center justify-center rounded-md bg-teal-700 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-800"
                  >
                    Únete a la comunidad
                  </a>
                </div>
              </div>
            </section>
          </article>
        </div>
      </main>

      <MarketingFooter
        columns={footerColumns}
        social={[
          {
            label: 'YouTube',
            href: 'https://www.youtube.com/@esturide',
            icon: (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M23.498 6.186a2.99 2.99 0 0 0-2.105-2.116C19.532 3.5 12 3.5 12 3.5s-7.532 0-9.393.57A2.99 2.99 0 0 0 .502 6.186C0 8.064 0 12 0 12s0 3.936.502 5.814a2.99 2.99 0 0 0 2.105 2.116C4.468 20.5 12 20.5 12 20.5s7.532 0 9.393-.57a2.99 2.99 0 0 0 2.105-2.116C24 15.936 24 12 24 12s0-3.936-.502-5.814ZM9.6 15.6V8.4L15.84 12 9.6 15.6Z" />
              </svg>
            ),
          },
          {
            label: 'Facebook',
            href: 'https://www.facebook.com/esturide',
            icon: (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M22 12a10 10 0 1 0-11.563 9.875v-6.987H7.898V12h2.539V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562V12h2.773l-.443 2.888h-2.33v6.987A10.002 10.002 0 0 0 22 12Z" />
              </svg>
            ),
          },
          {
            label: 'LinkedIn',
            href: 'https://www.linkedin.com/company/esturide',
            icon: (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554V14.89c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.66H9.351V9h3.414v1.561h.047c.476-.9 1.637-1.85 3.369-1.85 3.601 0 4.266 2.37 4.266 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.114 20.452H3.559V9h3.555v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.273V1.727C24 .774 23.2 0 22.222 0h.003Z" />
              </svg>
            ),
          },
        ]}
        copyrightText="©{year} Esturide"
      />
    </div>
  );
}
