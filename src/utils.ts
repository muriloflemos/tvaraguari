import { Linking } from 'react-native';
import { FACEBOOK, WEBSITE, INSTAGRAM, WHATSAPP } from './config';
import { showMessage, MessageOptions } from "react-native-flash-message";

export function openUrl(url: string, errorMessage: string) {
  const error: MessageOptions = {
    message: errorMessage,
    type: "danger",
  };
  console.log(url);
  Linking.canOpenURL(url).then(value => {
    if (value) {
      Linking.openURL(url).catch(() => showMessage(error));
    } else {
      showMessage(error);
    }
  }).catch(() => {
    showMessage(error);
  });
}

export function openWebsite() {
  openUrl(WEBSITE, "Não foi possível abrir o site!");
}

export async function openFacebook() {
  const url = `fb://profile?id=${FACEBOOK}`;
  openUrl(url, "Não foi possível abrir o Facebook!");
}

export function openInstagram() {
  const url = `instagram://user?username=${INSTAGRAM}`;
  openUrl(url, "Não foi possível abrir o Instagram!");
}

export function openWhatsapp() {
  const url = `whatsapp://send?phone=${WHATSAPP}`;
  openUrl(url, "Não foi possível abrir o Whatsapp!");
}

