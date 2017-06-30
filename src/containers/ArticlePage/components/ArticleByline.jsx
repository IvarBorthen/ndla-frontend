/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';
import { Time, User } from 'ndla-ui/icons';

const classes = new BEMHelper({
  name: 'article',
  prefix: 'c-',
});

const AuthorsList = ({ authors }) =>
  <span {...classes('authors')}>
    <User /> {authors.map(author => author.name).join(', ')}
  </span>;

AuthorsList.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const LastUpdated = ({ date }) =>
  <span {...classes('date')}>
    <Time /> Sist oppdatert: {date}
  </span>;

LastUpdated.propTypes = {
  date: PropTypes.string,
};

const ArticleByline = ({ authors, updated, children }) =>
  <div>
    <section {...classes('byline')}>
      {authors && <AuthorsList authors={authors} />}
      <LastUpdated date={updated} />
      {children}
    </section>
  </div>;

ArticleByline.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  updated: PropTypes.string.isRequired,
};

export default ArticleByline;