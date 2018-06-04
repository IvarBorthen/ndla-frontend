/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { compose } from 'redux';
import { FrontpageHeader, FrontpageSearchSection, OneColumn } from 'ndla-ui';
import { injectT } from 'ndla-i18n';
import { GraphQLResourceShape } from '../../graphqlShapes';
import { frontpageQuery } from '../../queries';
import { runQueries } from '../../util/runQueries';
import handleError from '../../util/handleError';
import WelcomePageInfo from './WelcomePageInfo';
import FrontpageSubjects from './FrontpageSubjects';
import FrontpageHighlights from './FrontpageHighlights';

export class WelcomePage extends Component {
  static async getInitialProps(ctx) {
    const { client } = ctx;
    try {
      return runQueries(client, [
        {
          query: frontpageQuery,
        },
      ]);
    } catch (error) {
      handleError(error);
      return null;
    }
  }

  constructor() {
    super();
    this.state = {
      expanded: null,
      query: '',
    };
  }

  onExpand = expanded => {
    this.setState({ expanded });
  };

  onSearchFieldChange = evt => {
    evt.preventDefault();
    this.setState({ query: evt.target.value });
  };

  onSearch = evt => {
    evt.preventDefault();
    const { history } = this.props;
    history.push({
      pathname: '/search',
      search: queryString.stringify({
        query: this.state.query,
        page: 1,
      }),
    });
  };

  render() {
    const { t, data } = this.props;
    if (!data || !data.frontpage) {
      return null;
    }
    const { frontpage: { categories, topical } } = data;
    const { expanded, query } = this.state;
    const headerLinks = [
      {
        href: 'https://om.ndla.no',
        text: t('welcomePage.heading.links.aboutNDLA'),
      },
      {
        href: '#language-select',
        text: t('welcomePage.heading.links.changeLanguage'),
      },
    ];

    const headerMessages = {
      searchFieldTitle: t('welcomePage.heading.messages.searchFieldTitle'),
      menuButton: t('welcomePage.heading.messages.menuButton'),
    };

    return (
      <Fragment>
        <FrontpageHeader
          heading={t('welcomePage.heading.heading')}
          searchFieldValue={query}
          onSearch={this.onSearch}
          onSearchFieldChange={this.onSearchFieldChange}
          searchFieldPlaceholder={t(
            'welcomePage.heading.searchFieldPlaceholder',
          )}
          messages={headerMessages}
          links={headerLinks}
        />
        <main>
          <FrontpageSubjects
            expanded={expanded}
            categories={categories}
            onExpand={this.onExpand}
          />
          <OneColumn>
            <FrontpageSearchSection
              heading={t('welcomePage.search')}
              searchFieldValue={query}
              onSearchFieldChange={this.onSearchFieldChange}
              onSearch={this.onSearch}
            />
            <FrontpageHighlights topical={topical} />
            <WelcomePageInfo />
          </OneColumn>
        </main>
      </Fragment>
    );
  }
}

WelcomePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    frontpage: PropTypes.shape({
      topical: PropTypes.arrayOf(PropTypes.shape(GraphQLResourceShape)),
      categories: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          subjects: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string.isRequired,
              name: PropTypes.string.isRequired,
              path: PropTypes.string.isRequired,
            }),
          ),
        }),
      ),
    }),
  }),
};

export default compose(injectT)(WelcomePage);
