import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import { PRIMARY_COLOR } from '../config';
import { openWebsite, openFacebook, openInstagram, openWhatsapp } from '../utils';

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: PRIMARY_COLOR,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    paddingTop: 13,
    flexDirection: 'row',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    marginTop: 5,
    color: 'white',
    fontSize: 11,
  }
});

function Tab({ icon, label, onPress }: any) {
  return (
    <TouchableOpacity style={styles.tab} activeOpacity={0.8} onPress={onPress}>
      <FontAwesomeIcon icon={icon} size={20} color='white' />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

export function AppTabBar() {
  return (
    <View style={styles.container}>
      <Tab icon={faGlobe} label={'Site'} onPress={() => openWebsite()}></Tab>
      <Tab icon={faFacebook} label={'Facebook'} onPress={() => openFacebook()}></Tab>
      <Tab icon={faWhatsapp} label={'Whatsapp'} onPress={() => openWhatsapp()}></Tab>
      <Tab icon={faInstagram} label={'Instagram'} onPress={() => openInstagram()}></Tab>
    </View>
  );
}
