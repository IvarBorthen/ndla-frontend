/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { take, call, put, select } from 'redux-saga-effects';
import { getTopic, hasFetchedTopicsBySubjectId } from './topicSelectors';
import * as actions from './topicActions';
import { fetchTopicResources } from '../Resources/resourceSagas';
import { getArticleIdFromResource, isArticleResource } from '../Resources/resourceHelpers';
import { fetchArticle } from '../ArticlePage/articleActions';
import * as articleApi from '../ArticlePage/articleApi';
import * as api from './topicApi';
import { getAccessToken } from '../App/sessionSelectors';


export function* fetchTopicIntroductions(topics) {
  try {
    const ids = topics
                  .filter(isArticleResource)
                  .map(getArticleIdFromResource);

    if (ids.length === 0) {
      return;
    }
    const token = yield select(getAccessToken);
    const data = yield call(articleApi.fetchArticles, ids, token);
    yield put(actions.setTopicIntroductions({ topics, articleIntroductions: data.results }));
  } catch (error) {
    throw error;
    // TODO: handle error
    // yield put(actions.applicationError());
  }
}

export function* fetchTopics(subjectId, topicId) {
  try {
    const token = yield select(getAccessToken);
    const topics = yield call(api.fetchTopics, subjectId, token);
    yield put(actions.setTopics({ topics, subjectId }));
    if (topicId) { // Fetch related article if topicId is defined
      yield put(actions.fetchTopicArticle({ topicId, subjectId }));
    }
    yield call(fetchTopicIntroductions, topics);
  } catch (error) {
    throw error;
    // TODO: handle error
    // yield put(actions.applicationError());
  }
}

export function* watchFetchTopicResources() {
  while (true) {
    const { payload: { topicId } } = yield take(actions.fetchTopicResources);
    // const { payload: { subjectId, topicId } } = yield take(actions.fetchTopicResources);
    // const topics = yield select(getSubtopics(subjectId, topicId));

    // TODO: Check if already fetched
    // yield [call(fetchTopicIntroductions, topics), call(fetchTopicResources, topicId)];
    yield call(fetchTopicResources, topicId);
  }
}

export function* watchFetchTopics() {
  while (true) {
    const { payload: { subjectId, topicId } } = yield take(actions.fetchTopics);
    const hasFetched = yield select(hasFetchedTopicsBySubjectId(subjectId));
    if (!hasFetched) {
      yield call(fetchTopics, subjectId, topicId);
    }
  }
}


export function* watchFetchTopicArticle() {
  while (true) {
    const { payload: { subjectId, topicId } } = yield take(actions.fetchTopicArticle);
    const topic = yield select(getTopic(subjectId, topicId));

    if (!topic) {
      yield put(actions.fetchTopics({ subjectId, topicId })); // Need to fetch topics first
    } else if (isArticleResource) {
      const articleId = getArticleIdFromResource(topic);
      if (articleId) {
        yield put(fetchArticle(articleId));
      }
    }
  }
}

export default [
  watchFetchTopics,
  watchFetchTopicArticle,
  watchFetchTopicResources,
];