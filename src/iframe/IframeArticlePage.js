/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';

import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { PageContainer, OneColumn, ErrorMessage } from 'ndla-ui';
import IntlProvider, { injectT } from 'ndla-i18n';
import { transformArticle } from '../util/transformArticle';
import Article from '../components/Article';
import { getArticleScripts } from '../util/getArticleScripts';
import { ArticleShape } from '../shapes';
import { getArticleProps } from '../util/getArticleProps';

const Error = injectT(({ t }) => (
  <OneColumn cssModifier="clear">
    <ErrorMessage
      messages={{
        title: t('errorMessage.title'),
        description: t('errorMessage.description'),
      }}
    />
  </OneColumn>
));

const Success = ({ article: rawArticle, locale }) => {
  const article = transformArticle(rawArticle, locale);
  const scripts = getArticleScripts(article);
  return (
    <OneColumn cssModifier="clear">
      <Helmet>
        <title>{`NDLA | ${article.title}`}</title>
        {article.metaDescription && (
          <meta name="description" content={article.metaDescription} />
        )}

        {scripts.map(script => (
          <script
            key={script.src}
            src={script.src}
            type={script.type}
            async={script.async}
          />
        ))}
      </Helmet>
      <Article
        article={article}
        locale={locale}
        {...getArticleProps(article)}
      />
    </OneColumn>
  );
};

Success.propTypes = {
  locale: PropTypes.string.isRequired,
  article: ArticleShape.isRequired,
};

const IframeArticlePage = ({
  status,
  locale: { abbreviation: locale, messages },
  article,
}) => (
  <IntlProvider locale={locale} messages={messages}>
    <PageContainer>
      <Helmet htmlAttributes={{ lang: locale }} />
      {status === 'success' && <Success locale={locale} article={article} />}
      {status === 'error' && <Error />}
    </PageContainer>
  </IntlProvider>
);

IframeArticlePage.propTypes = {
  locale: PropTypes.shape({
    abbreviation: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
  }).isRequired,
  article: ArticleShape,
  status: PropTypes.oneOf(['success', 'error']),
};

export default IframeArticlePage;