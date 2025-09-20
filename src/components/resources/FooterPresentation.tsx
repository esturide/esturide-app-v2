import { FaFacebook, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import IconLink from '@components/text/IconLink.tsx';

const DefaultLinks = {
  youtube: 'https://www.youtube.com/@esturide',
  linkedin: 'https://www.linkedin.com/company/esturide',
  facebook: 'https://www.facebook.com/esturide',
} as const;

function FooterPresentation() {
  return (
    <div
      className={
        'px-8 py-6 h-screen w-full flex flex-col bg-teal-700 inset-shadow-sm inset-shadow-teal-800/25 rounded-t-3xl text-white'
      }
    >
      <div className={'flex flex-col gap-12 overflow-auto overflow-x-hidden'}>
        <div>
          <h1 className={'text-2xl font-semibold'}>Esturide</h1>
          <p className={'text-lg font-light'}>Visita centro de ayuda</p>
        </div>

        <div className={'flex flex-row gap-8'}>
          <div className={'flex flex-col gap-2'}>
            <h2 className={'text-lg'}>Compañia</h2>
            <p className={'font-light'}>Quiénes somos</p>
            <p className={'font-light'}>Lo que ofrecemos</p>
            <p className={'font-light'}>Blog</p>
          </div>

          <div className={'flex flex-col gap-2'}>
            <h2 className={'text-lg'}>Compañia</h2>
            <p className={'font-light'}>Quiénes somos</p>
            <p className={'font-light'}>Lo que ofrecemos</p>
            <p className={'font-light'}>Blog</p>
          </div>
        </div>

        <div>
          <div className={'flex flex-row justify-between items-center gap-1'}>
            <IconLink
              icon={FaYoutube}
              label={'Youtube'}
              to={DefaultLinks.youtube}
              external
            />
            <IconLink
              icon={FaFacebook}
              label={'Facebook'}
              to={DefaultLinks.facebook}
              external
            />
            <IconLink
              icon={FaLinkedinIn}
              label={'Linkedin'}
              to={DefaultLinks.linkedin}
              external
            />
          </div>
        </div>

        <div className={'flex flex-row justify-between'}>
          <p className={'text-sm font-light'}>© 2025 Esturide</p>

          <div className={'flex flex-row gap-2'}>
            <p className={'text-sm font-light'}>Privacidad</p>
            <p className={'text-sm font-light'}>Accesibilidad</p>
            <p className={'text-sm font-light'}>Términos</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterPresentation;
