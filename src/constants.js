/**
 * Copyright (c) 2017-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import {
  SubjectMaterialBadge,
  TasksAndActivitiesBadge,
  SubjectBadge,
  ExternalLearningResourcesBadge,
  SourceMaterialBadge,
  LearningPathBadge,
} from 'ndla-ui';

export const RESOURCE_TYPE_LEARNING_PATH = 'urn:resourcetype:learningPath';
export const RESOURCE_TYPE_SUBJECT_MATERIAL =
  'urn:resourcetype:subjectMaterial';
export const RESOURCE_TYPE_TASKS_AND_ACTIVITIES =
  'urn:resourcetype:tasksAndActivities';
export const RESOURCE_TYPE_ASSESSMENT_RESOURCES =
  'urn:resourcetype:reviewResource';
export const RESOURCE_TYPE_EXTERNAL_LEARNING_RESOURCES =
  'urn:resourcetype:externalResource';
export const RESOURCE_TYPE_SOURCE_MATERIAL = 'urn:resourcetype:SourceMaterial';

export const contentTypeIcons = {
  subject: <SubjectBadge size="x-small" background />,
  'topic-article': <SubjectBadge size="x-small" background />,
  'learning-path': <LearningPathBadge size="x-small" background />,
  'tasks-and-activities': <TasksAndActivitiesBadge size="x-small" background />,
  'external-learning-resources': (
    <ExternalLearningResourcesBadge size="x-small" backgrounde />
  ),
  'source-material': <SourceMaterialBadge size="x-small" background />,
  'subject-material': <SubjectMaterialBadge size="x-small" background />,
};
