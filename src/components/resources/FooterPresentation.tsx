import { FaFacebook, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import IconLink from '@components/text/IconLink.tsx';
import TextLink from '@components/text/TextLink.tsx';
import HeaderText from '@components/text/HeaderText.tsx';

const DefaultLinks = {
  youtube: 'https://www.youtube.com/@esturide',
  linkedin: 'https://www.linkedin.com/company/esturide',
  facebook: 'https://www.facebook.com/esturide',
} as const;

function FooterPresentation() {
  return (
    <div
      className={
        'px-8 py-6 w-full flex flex-col bg-teal-700 inset-shadow-sm inset-shadow-teal-800/25 rounded-t-3xl text-white'
      }
    >
      <div className={'flex flex-col gap-12 overflow-auto overflow-x-hidden'}>
        <div>
          <HeaderText title={'Esturide'} weight={1} />
          <TextLink label={'Visita centro de ayuda'} to={'/help'} />
        </div>

        <div className={'flex flex-row gap-8'}>
          <div className={'flex flex-col gap-2'}>
            <HeaderText title={'Compañia'} weight={2} />

            <TextLink label={'Quiénes somos'} to={'/qa'} />
            <TextLink label={'Lo que ofrecemos'} to={'/about'} />
            <TextLink label={'Blog'} to={'/blog'} />
          </div>
        </div>

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

        <div className={'flex flex-row justify-between'}>
          <TextLink label={'© 2025 Esturide'} to={'/'} weight={'light'} />

          <div className={'flex flex-row gap-2'}>
            <TextLink
              label={'Accesibilidad'}
              to={'/accessibility'}
              weight={'light'}
            />
            <TextLink label={'Privacidad'} to={'/privacy'} weight={'light'} />
            <TextLink label={'Términos'} to={'/terms'} weight={'light'} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterPresentation;
