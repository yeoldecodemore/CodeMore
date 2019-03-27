/* eslint-disable react/display-name */
import React from 'react'

const iconMap = {
  answer: ({className}) => (
    <img className={className} src="./images/answer.png" />
  ),
  bronze: ({className}) => (
    <img className={className} src="./images/bronzeMedal.png" />
  ),
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
  day: ({className}) => <img className={className} src="./images/day.png" />,
  github: ({className}) => (
    <img className={className} src="./images/github.svg" />
  ),
  go: ({className}) => <img className={className} src="./images/go.svg" />,
  gold: ({className}) => (
    <img className={className} src="./images/goldMedal.png" />
  ),
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
  month: ({className}) => (
    <img className={className} src="./images/month.png" />
  ),
  netvote: ({className}) => (
    <img className={className} src="./images/netvote.png" />
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
  questionmark: ({className}) => (
    <img className={className} src="./images/questionMark.png" />
  ),
  ruby: ({className}) => <img className={className} src="./images/ruby.svg" />,
  shell: ({className}) => <img className={className} src="./images/ssh.svg" />,
  silver: ({className}) => (
    <img className={className} src="./images/silverMedal.png" />
  ),
  sql: ({className}) => <img className={className} src="./images/sql.svg" />,
  stackoverflow: ({className}) => (
    <img className={className} src="./images/stackoverflow.png" />
  ),
  swift: ({className}) => (
    <img className={className} src="./images/swift.svg" />
  ),
  week: ({className}) => <img className={className} src="./images/week.png" />
}

export const mapIcon = (val, placeholder) =>
  val ? iconMap[val.toLowerCase()] : iconMap[placeholder]
