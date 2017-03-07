/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const phrases = {
  meta: {
    description: 'Kvalitetssikrede fritt tilgjengelige nettbaserte læremidler for videregående opplæring',
  },
  message: 'message',
  messages: 'messages',
  welcomePage: {
    chooseSubject: 'Velg fag',
  },
  subjectsPage: {
    chooseSubject: 'Velg fag',
  },
  logo: {
    altText: 'Nasjonal digital læringsarena',
  },
  siteNav: {
    chooseSubject: 'Velg fag',
    search: 'Søk',
    contact: 'Kontakt',
    help: 'Hjelp',
  },
  searchForm: {
    placeholder: 'Søk etter artikler',
    btn: 'Søk',
    order: {
      relevance: 'Relevans',
      title: 'Alfabetisk',
    },
  },
  article: {
    author: 'Forfatter',
    published: 'Publisert',
    created: 'Opprettet',
    lastUpdated: 'Sist oppdatert',
    closeLicenseBox: 'Lukk boks',
    openLicenseBox: 'Gjenbruk {contentType}',
  },
  subject: {
    associatedTopics: 'Tilhørende emner',
  },
  license: {
    heading: 'Du kan laste ned, eller innbygge innhold fra NDLA på ditt eget nettsted',
    creators: '{num, plural, one { Opphavsperson: } other { Opphavspersoner: }}',
    tabs: {
      heading: 'Regler for gjenbruk av {contentType} på NDLA',
      introduction: `Alt innhold på NDLA har egne opphavsrettigheter. Disse må du ta hensyn
      til dersom du skal gjenbruke noe av dette innholdet utenfor ndla.no. Opphavsretten
      bestemmer hvordan du kan bruke innholdet, enten det skal publiseres, deles på internett,
      eller hvis noen skal tjene penger på det. Under kan du kan du se hvordan du kan bruke innholdet
      i {contentType}.`,
      article: 'Artikkel',
      texts: 'Tekst',
      cite: 'Sitere',
      citation: {
        explaination: `Når du siterer tekster fra NDLA må du vise hvor du har funnet dem
          og hvem som har laget dem. Hvis du skriver en egen tekst plasserer
          du referansen på den siste siden. Slik siterer du denne teksten:`,
      },
      images: 'Bilder',
      audios: 'Lydfiler',
    },
    images: {
      heading: 'Slik bruker du bilder fra artikkelen',
      description: 'Klikk på lisensene for å se reglene. Husk å kopier teksten som skal legges ved bildet der du bruker det.',
    },
    texts: {
      heading: 'Slik bruker du tekst fra artikkelen',
      description: 'Artikkelen kan være satt sammen av flere ulike tekster, som listes opp her. Klikk på lisensene for å se reglene for hver enkelt del.',
    },
    audios: {
      heading: 'Slik bruker du lydfiler',
    },
  },
  resources: {
    tabs: {
      all: 'Alle',
      learningpaths: 'Læringsstier',
      subjectMaterial: 'Fagstoff',
    },
    links: {
      viewAllLearningPaths: 'Se alle læringsstier \u2192',
      viewAllSubjectMaterials: 'Se alt fagstoff \u2192',
    },
  },
  searchPage: {
    noHits: 'Ingen atikler samsvarte med søket ditt på: %{query}',
  },
  topicPage: {
    closeArticleTopic: 'Skjul emnebeskrivelse',
    openArticleTopic: 'Se hele emnebeskrivelse',
    breadcrumbLabel: 'Du er her:',
    tabs: {
      learningresources: 'Læringsressurser',
      topics: 'Emner',
    },
  },
  footer: {
    aboutNDLA: 'Om NDLA',
    selectLanguage: 'Velg språk (language): ',
    footerInfo: 'Nettstedet er utarbeidet av NDLA som åpen kildekode.',
    footerEditiorInChief: 'Ansvarlig redaktør: ',
    footerManagingEditor: 'Utgaveansvarlig: ',
  },
};

export default phrases;
