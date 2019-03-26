/* eslint-disable react/display-name */
import React from 'react'

const iconMap = {
  c: () => <img src="./images/c.svg" className="languageIcon" />,
  calender: () => <img src="./images/calender.png" className="languageIcon" />,
  clap: () => <img src="./images/clap.png" className="languageIcon" />,
  cpp: () => <img src="./images/cplusplus.svg" className="languageIcon" />,
  csharp: () => <img src="./images/csharp.svg" className="languageIcon" />,
  css: () => <img src="./images/css3.svg" className="languageIcon" />,
  github: () => <img src="./images/github.svg" className="languageIcon" />,
  go: () => <img src="./images/go.svg" className="languageIcon" />,
  hackernoon: () => (
    <img src="./images/hackernoon.png" className="languageIcon" />
  ),
  html: () => <img src="./images/html5.svg" className="languageIcon" />,
  java: () => <img src="./images/java.svg" className="languageIcon" />,
  javascript: () => (
    <img src="./images/javascript.svg" className="languageIcon" />
  ),
  medium: () => (
    <img className="languageIcon" src="./images/mediumInverted.png" />
  ),
  paperedit: () => (
    <img className="languageIcon" src="./images/paperEdit.png" />
  ),
  php: () => <img src="./images/php.svg" className="languageIcon" />,
  python: () => <img src="./images/python.svg" className="languageIcon" />,
  question: () => <img src="./images/question.png" className="languageIcon" />,
  ruby: () => <img src="./images/ruby.svg" className="languageIcon" />,
  shell: () => <img src="./images/ssh.svg" className="languageIcon" />,
  sql: () => <img src="./images/sql.svg" className="languageIcon" />,
  swift: () => <img src="./images/swift.svg" className="languageIcon" />
}

export const mapIcon = (val, placeholder) =>
  val ? iconMap[val.toLowerCase()] : iconMap[placeholder]
