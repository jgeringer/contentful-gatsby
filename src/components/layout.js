import React from "react"
import { Link } from "gatsby"
import { rhythm, scale } from "../utils/typography"

import { IntlProvider, addLocaleData } from 'react-intl';
import Helmet from 'react-helmet'
import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';
import 'intl';

import en from 'react-intl/locale-data/en';
import 'intl/locale-data/jsonp/en';
import de from 'react-intl/locale-data/de';
import 'intl/locale-data/jsonp/de';

import PropTypes from 'prop-types'
import Header from '../components/Header'

// add concatenated locale data
addLocaleData([...en, ...de]);

const Layout = ({ data, location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  // const location = this.props.location;
  const url = window.location.pathname;
  const { langs, defaultLangKey } = data.site.siteMetadata.languages;
  const langKey = getCurrentLangKey(langs, defaultLangKey, url);
  const homeLink = `/${langKey}/`;
  const langsMenu = getLangs(langs, langKey, getUrlForLang(homeLink, url));

  // get the appropriate message file based on langKey
  // at the moment this assumes that langKey will provide us
  // with the appropriate language code
  const i18nMessages = require(`../data/messages/${langKey}`);



  if (location === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
  }
  return (
    <IntlProvider
        locale={langKey}
        messages={i18nMessages}
      >
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <Helmet
            title="Gatsby Default Starter"
            meta={[
              { name: 'description', content: 'Sample' },
              { name: 'keywords', content: 'sample, something' },
            ]}
          />
          <Header langs={langsMenu} />
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </IntlProvider>
  )
}

export default Layout
