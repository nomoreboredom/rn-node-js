/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import crypto from 'crypto'

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

type Props = {};

export default class App extends Component<Props> {
  encrypt = (text) => {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
  }
  decrypt = (text) => {
   let iv = Buffer.from(text.iv, 'hex');
   let encryptedText = Buffer.from(text.encryptedData, 'hex');
   let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
   let decrypted = decipher.update(encryptedText);
   decrypted = Buffer.concat([decrypted, decipher.final()]);
   return decrypted.toString();
  }
  render() {
    const res = this.encrypt("MY SECRET AND IMPORTANT THING")
    return (
      <View style={styles.container, {margin:20}}>
        <Text style={styles.title}>encryptedData</Text>
        <Text style={styles.info}>{JSON.stringify(res)}</Text>
        <Text style={styles.title}>decryptedData</Text>
        <Text style={styles.info}>{this.decrypt(res)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  info: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
