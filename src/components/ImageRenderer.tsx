import LogoBbc from '@/images/logos/bbc.svg'
import LogoCbs from '@/images/logos/cbs.svg'
import LogoCnn from '@/images/logos/cnn.svg'
import LogoFastCompany from '@/images/logos/fast-company.svg'
import LogoForbes from '@/images/logos/forbes.svg'
import LogoHuffpost from '@/images/logos/huffpost.svg'
import LogoTechcrunch from '@/images/logos/techcrunch.svg'
import LogoWired from '@/images/logos/wired.svg'
import QrCode from '@/images/qr-code.svg'
import React, { type FC, type SVGProps } from "react";
import {
  CheckIcon,
  ChevronUpIcon,
  DeviceArrowIcon,
  DeviceCardsIcon,
  DeviceChartIcon,
  DeviceClockIcon,
  DeviceListIcon,
  DeviceLockIcon,
  DeviceNotificationIcon,
  DeviceTouchIcon,
  DeviceUserIcon,
  LogoIcon,
  LogomarkIcon,
  LogoWithLogomark,
  MenuIcon,
  PlayIcon,
  QrCodeBorderIcon,
  StarIcon,
  UserIcon
} from "@/images/icons/icons";
import { countryCodeToSVG } from "@/images/country-flags/country-list";

/*
* Whenever adding a new SVG/icon to files or icons.tsx,
* please also import it here and add to the list below with an alias.
*/
const svgs = {
  "LogoBbc": LogoBbc,
  "LogoCbs": LogoCbs,
  "LogoCnn": LogoCnn,
  "LogoFastCompany": LogoFastCompany,
  "LogoForbes": LogoForbes,
  "LogoHuffpost": LogoHuffpost,
  "LogoTechcrunch": LogoTechcrunch,
  "LogoWired": LogoWired,
  "DeviceArrowIcon": DeviceArrowIcon,
  "DeviceCardsIcon": DeviceCardsIcon,
  "DeviceClockIcon": DeviceClockIcon,
  "DeviceListIcon": DeviceListIcon,
  "DeviceLockIcon": DeviceLockIcon,
  "DeviceChartIcon": DeviceChartIcon,
  "DeviceUserIcon": DeviceUserIcon,
  "DeviceNotificationIcon": DeviceNotificationIcon,
  "DeviceTouchIcon": DeviceTouchIcon,
  "LogoIcon": LogoIcon,
  "MenuIcon": MenuIcon,
  "UserIcon": UserIcon,
  "StarIcon": StarIcon,
  "CheckIcon": CheckIcon,
  "PlayIcon": PlayIcon,
  "ChevronUpIcon": ChevronUpIcon,
  "QrCode": QrCode,
  "QrCodeBorderIcon": QrCodeBorderIcon,
  "LogomarkIcon": LogomarkIcon,
  "LogoWithLogomark": LogoWithLogomark,
  ...countryCodeToSVG
}

type FileNames = keyof typeof svgs;

interface ImageRendererProps {
  name: string;
  index?: number | string;

  [key: string]: unknown;
}

// Renders images(svgs, icons..) from a string alias.
export default function ImageRenderer({ name, index, ...props }: ImageRendererProps) {
  const component: FC<SVGProps<SVGElement>> = svgs[name as FileNames];

  if (typeof component !== 'undefined') {
    return React.createElement(component as FC<typeof props>, {
      key: index,
      ...props
    })
  }
  return React.createElement(
    () => <div>The section {name} has not been created yet.</div>,
    { index: index }
  )
}
