/* eslint-disable react/display-name */
import React from 'react'

const iconMap = {
  c: ({className}) => <img className={className} src="./images/c.svg" />,
  calendar: ({className}) => (
    <img className={className} src="./images/calendar.png" />
  ),
  clap: ({className}) => <img className={className} src="./images/clap.png" />,
  cpp: ({className}) => (
    <img className={className} src="./images/cplusplus.svg" />
  ),
  csharp: ({className}) => (
    <img className={className} src="./images/csharp.svg" />
  ),
  css: ({className}) => <img className={className} src="./images/css3.svg" />,
  github: ({className}) => (
    <img className={className} src="./images/github.svg" />
  ),
  go: ({className}) => <img className={className} src="./images/go.svg" />,
  hackernoon: ({className}) => (
    <img className={className} src="./images/hackernoon.png" />
  ),
  html: ({className}) => <img className={className} src="./images/html5.svg" />,
  java: ({className}) => <img className={className} src="./images/java.svg" />,
  javascript: ({className}) => (
    <img className={className} src="./images/javascript.svg" />
  ),
  medium: ({className}) => (
    <img className={className} src="./images/mediumInverted.png" />
  ),
  paperedit: ({className}) => (
    <img className={className} src="./images/paperEdit.png" />
  ),
  php: ({className}) => <img className={className} src="./images/php.svg" />,
  python: ({className}) => (
    <img className={className} src="./images/python.svg" />
  ),
  question: ({className}) => (
    <img className={className} src="./images/question.png" />
  ),
  ruby: ({className}) => <img className={className} src="./images/ruby.svg" />,
  shell: ({className}) => <img className={className} src="./images/ssh.svg" />,
  sql: ({className}) => <img className={className} src="./images/sql.svg" />,
  swift: ({className}) => <img className={className} src="./images/swift.svg" />
}

export const mapIcon = (val, placeholder) =>
  val ? iconMap[val.toLowerCase()] : iconMap[placeholder]
