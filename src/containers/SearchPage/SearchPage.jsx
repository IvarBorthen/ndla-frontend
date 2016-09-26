/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import * as actions from './searchActions';
import { getResults, getLastPage, getSearching } from './searchSelectors';
import { getLocale } from '../Locale/localeSelectors';
import SearchForm from './components/SearchForm';
import SearchResultList from './components/SearchResultList';
import SelectSearchSortOrder from './components/SelectSearchSortOrder';
import { Pager, OneColumn } from '../../components';
import { toSearch } from '../../routes';

class SearchPage extends Component {

  componentWillMount() {
    const { location: { query }, search } = this.props;
    if (query.query) {
      search(query);
    }
  }

  render() {
    const { location: { query }, results, locale, searching, search, lastPage } = this.props;

    return (
      <OneColumn cssModifier="narrow">
        <SearchForm
          query={query.query}
          searching={searching}
          onSearchQuerySubmit={searchQuery => search({ query: searchQuery, page: 1, sortOrder: query.sortOrder ? query.sortOrder : 'relevance' })}
        />

        <SelectSearchSortOrder
          sort={query.sortOrder}
          onSortOrderChange={sortOrder => search({ query: query.query, sortOrder, page: 1 })}
        />

        <SearchResultList query={query} locale={locale} results={results} />

        <Pager
          page={query.page ? parseInt(query.page, 10) : 1}
          lastPage={lastPage}
          query={query}
          onClick={q => search(q)}
          pathname={toSearch()}
        />
      </OneColumn>
    );
  }
}

SearchPage.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({
      query: PropTypes.string,
      page: PropTypes.string,
    }).isRequired,
  }).isRequired,
  locale: PropTypes.string.isRequired,
  lastPage: PropTypes.number.isRequired,
  results: PropTypes.array.isRequired,
  searching: PropTypes.bool.isRequired,
  search: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  search: actions.search,
};

const mapStateToProps = state => ({
  locale: getLocale(state),
  results: getResults(state),
  lastPage: getLastPage(state),
  searching: getSearching(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);