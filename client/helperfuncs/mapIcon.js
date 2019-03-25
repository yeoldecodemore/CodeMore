import {
  FaJsSquare,
  FaJava,
  FaJs,
  FaNodeJs,
  FaNode,
  FaImage
} from 'react-icons/fa'
import {
  DiRuby,
  DiMysql,
  DiHtml5,
  DiErlang,
  DiGo,
  DiHaskell,
  DiScala,
  DiPerl,
  DiCSS3
} from 'react-icons/di'

const iconMap = {
  Javascript: FaJsSquare,
  Java: FaJava,
  Node: FaNodeJs,
  Ruby: DiRuby
}

export const mapIcon = val => (iconMap[val] ? iconMap[val] : FaImage)
