import React from 'react';
import { Image } from 'native-base';

import logo from '../assets/images/logo-horizontal.png';

export function LogoHeader() {
  return <Image source={logo} alt="logo" h={8} resizeMode={'contain'} />;
}