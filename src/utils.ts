import { Linking } from 'react-native';
import { FACEBOOK, WEBSITE, INSTAGRAM, WHATSAPP } from './config';

export function openWebsite() {
  Linking.canOpenURL(WEBSITE).then(value => {
    if (value) Linking.openURL(WEBSITE);
    else console.log('Não foi possível abrir o Site');
  });
}

export async function openFacebook() {
  const url = `fb://page/${FACEBOOK}`;
  Linking.canOpenURL(url).then(value => {
    if (value) Linking.openURL(url);
    else console.log('Não foi possível abrir o Facebook');
  });
}

export function openInstagram() {
  const instagramUrl = `instagram://user?username=${INSTAGRAM}`;
  Linking.canOpenURL(instagramUrl).then(value => {
    if (value) Linking.openURL(instagramUrl);
    else console.log('Não foi possível abrir o Instagram');
  });
}

export function openWhatsapp() {
  const instagramUrl = `'whatsapp://send?phone=${WHATSAPP}`;
  Linking.canOpenURL(instagramUrl).then(value => {
    if (value) Linking.openURL(instagramUrl);
    else console.log('Não foi possível abrir o Instagram');
  });
}

