import { Linking, Alert } from 'react-native';
import { FACEBOOK, WEBSITE, INSTAGRAM, WHATSAPP, YOUTUBE } from './config';

export function showMessage(title: string, msg: string, callback = () => {}) {
  Alert.alert(
    title,
    msg,
    [
      { text: "OK", onPress: () => callback() }
    ]
  );
}

export function openUrl(url: string, errorMessage: string) {
  console.log(url);
  Linking.canOpenURL(url).then(value => {
    console.log(value);
    if (value) {
      Linking.openURL(url).catch(() => showMessage("", errorMessage));
    } else {
      showMessage("", errorMessage);
    }
  }).catch((err) => {
    console.log(err);
    showMessage("", errorMessage);
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

export function openYoutube() {
  const url = `vnd.youtube://channel/${YOUTUBE}`;
  openUrl(url, "Não foi possível abrir o Youtube!");
}

