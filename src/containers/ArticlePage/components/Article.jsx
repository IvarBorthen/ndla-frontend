/*
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import { injectT } from '../../../i18n';
import LicenseByline from '../../../components/LicenseByline';
import LicenseBox from '../../../components/LicenseBox';

const Author = ({ author }) => (
  <span>{author.name}</span>
);

Author.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};

class Article extends Component {
  constructor() {
    super();
    this.licenseHandler = this.licenseHandler.bind(this);
    this.state = {
      hideLicenseByline: false,
    };
  }
  licenseHandler() {
    this.setState({ hideLicenseByline: !this.state.hideLicenseByline });
  }

  render() {
    const { article, t } = this.props;
    const authors = article.copyright.authors.map(author => author.name).join(', ');
    const licenseType = article.copyright.license.license;
    const licenseClass = classnames({
      'u-hide': this.state.hideLicenseByline,
    });

    return (
      <article className="article">
        <h1>{article.title}</h1>
        <div>
          <span className="article_meta">{authors}. {t('article.published')}: {article.created}</span>.
        </div>
        <LicenseByline
          licenseType={licenseType}
          licenseHandler={this.licenseHandler}
          contentType={article.contentType}
        />
        <div className={licenseClass}>
          <LicenseBox article={article} licenseType={licenseType} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>
    );
  }
}

Article.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    copyright: PropTypes.shape({
      authors: PropTypes.array.isRequired,
    }).isRequired,
  }).isRequired,
};


export default injectT(Article);
