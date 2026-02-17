import React from 'react';
import {
  FaCar,
  FaCarSide,
  FaFlagCheckered,
  FaRoute,
  FaUsers,
} from 'react-icons/fa';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useScheduleTravelManagementContext } from '@/context/ScheduleTravelManagementContext.tsx';
import SmallButton from '@components/buttons/SmallButton.tsx';
import UserInput from '@components/input/UserInput.tsx';
import HeaderText from '@components/text/HeaderText.tsx';

import LineElementList, {
  LineItem,
} from '@components/resources/LineElementList.tsx';

import '@styles/map/google-map-style.scss';
import IconButton from '@components/buttons/IconButton.tsx';
import { MdCancel } from 'react-icons/md';

export default function ScheduleTravelInformation() {
  const { currentSchedule } = useScheduleTravelManagementContext();

  if (!currentSchedule) {
    return;
  }

  const elements: LineItem[] = [
    {
      title: 'Inicio',
      icon: FaCarSide,
      item: () => <UserInput value={currentSchedule.origin} readOnly />,
    },
    {
      title: 'Destino',
      icon: FaFlagCheckered,
      item: () => <UserInput value={currentSchedule.destination} readOnly />,
    },
  ];

  return (
    <div className={'flex flex-col gap-2'}>
      <TabGroup>
        <TabList
          className={
            'text-gray-700 flex sm:gap-2 gap-8 md:justify-between justify-center p-2 mb-2 rounded-full bg-gray-300/30'
          }
        >
          <Tab
            className={
              'rounded-full p-2 bg-gray-500/30 hover:outline-2 focus:outline-3 outline-teal-600 focus:outline-gray-300'
            }
          >
            <FaCar />
          </Tab>
          <Tab
            className={
              'rounded-full p-2 bg-gray-500/30 hover:outline-2 focus:outline-3 outline-teal-600 focus:outline-gray-300'
            }
          >
            <FaUsers />
          </Tab>
          <Tab
            className={
              'rounded-full p-2 bg-gray-500/30 hover:outline-2 focus:outline-3 outline-teal-600 focus:outline-gray-300'
            }
          >
            <FaRoute />
          </Tab>
        </TabList>

        <TabPanels className={'px-2 sm:px-0'}>
          <TabPanel>
            <HeaderText title={'Viaje'} weight={1} />
          </TabPanel>

          <TabPanel>
            <HeaderText title={'Rides'} weight={1} />
          </TabPanel>

          <TabPanel>
            <LineElementList elements={elements} />
          </TabPanel>
        </TabPanels>
      </TabGroup>

      <div className={'flex flex-row gap-2'}>
        <SmallButton label={'Empezar'} />
        <IconButton icon={MdCancel} />
      </div>
    </div>
  );
}
