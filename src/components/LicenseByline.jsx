/*
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 * FRI OG BEGRENSET
 */

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { injectT } from '../i18n';
import LicenseBox from './LicenseBox';
import LicenseIconList from './LicenseIconList';
import getLicenseByKey from './licenseConstants';

class LicenseByline extends Component {
  constructor() {
    super();
    this.licenseExpander = this.licenseExpander.bind(this);
    this.state = {
      expandLicense: false,
    };
  }

  licenseExpander() {
    this.setState({
      expandLicense: !this.state.expandLicense,
    });
  }

  render() {
    const { licenseHandler, article, locale, licenseType, contentType, t } = this.props;
    const { expandLicense } = this.state;
    const authors = article.copyright.authors.map(author => author.name).join(', ');
    const expandedIcon = classnames({
      'u-expanded--svg': expandLicense,
    });

    const license = getLicenseByKey(licenseType, locale);

    return (
      <div className={classnames('license', { 'u-expanded': expandLicense })}>
        {
          licenseHandler && contentType ?
            <button
              className="un-button license-toggler site-nav_link"
              onClick={this.licenseExpander}
            >
              {expandLicense ? 'Lukk boks' : `Sitér eller bruk ${contentType.toLowerCase()}`}
            </button> : null
        }
        <div className="license-byline">
          <LicenseIconList licenseRights={license.rights} iconsClassName={expandedIcon} />
          <div className="license-byline__body">
            <span>{ license.short }</span>
          </div>
          <div className="license-byline__body">
            <span className="article_meta">{authors}. {t('article.published')}: {article.created}</span>.
          </div>
        </div>
        { expandLicense &&
          <LicenseBox
            article={article}
            locale={locale}
            licenseType={licenseType}
          />
        }
      </div>
    );
  }
}

LicenseByline.propTypes = {
  article: PropTypes.object,
  contentType: PropTypes.string,
  locale: PropTypes.string,
  licenseType: PropTypes.string,
  licenseHandler: PropTypes.func,
};

LicenseByline.defaultProps = {
  hideLicenseByline: false,
  licenseType: null,
  contentType: null,
  t: () => false,
  article: {
    copyright: {
      authors: [],
    },
  },
  licenseHandler: () => true,
};

export default injectT(LicenseByline);
