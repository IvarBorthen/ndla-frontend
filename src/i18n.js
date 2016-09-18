/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { addLocaleData, intlShape } from 'react-intl';

import enLocaleData from 'react-intl/locale-data/en';
import nbLocaleData from 'react-intl/locale-data/nb';
import nnLocaleData from 'react-intl/locale-data/nn';

import nb from './phrases/phrases-nb';
import en from './phrases/phrases-en';

addLocaleData(enLocaleData);
addLocaleData(nbLocaleData);
addLocaleData(nnLocaleData);

function* entries(obj) {
  for (const key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

const formatMessages = (phrases, formattedMessages = {}, prefix = '') => {
  const messages = formattedMessages;
  for (const [key, value] of entries(phrases)) {
    if ({}.hasOwnProperty.call(phrases, key)) {
      const keyWithPrefix = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'object') {
        formatMessages(value, formattedMessages, keyWithPrefix);
      } else {
        messages[keyWithPrefix] = value;
      }
    }
  }
  return messages;
};

const NB = { name: 'Bokmål', abbreviation: 'nb', messages: formatMessages(nb) };
const NN = { name: 'Nynorsk', abbreviation: 'nn', messages: formatMessages(nb) };
const EN = { name: 'English', abbreviation: 'en', messages: formatMessages(en) };

export const appLocales = [NB, NN, EN];
export const preferdLocales = [NB, NN, EN];

export const getLocaleObject = (localeAbbreviation) => {
  const locale = appLocales.find(l => l.abbreviation === localeAbbreviation);

  if (locale) {
    return locale;
  }

  return NB; // defaults to NB
};

export const isValidLocale = (localeAbbreviation) => appLocales.find(l => l.abbreviation === localeAbbreviation) !== undefined;


export const injectT = (WrappedComponent) => {
  function getDisplayName(component) {
    return component.displayName || component.name || 'Component';
  }

  const InjectT = (props, context) => <WrappedComponent {...props} t={(id) => context.intl.formatMessage({ id })} />;

  InjectT.contextTypes = {
    intl: intlShape,
  };

  InjectT.displayName = `InjectT(${getDisplayName(WrappedComponent)})`;

  return InjectT;
};

export default injectT;
