import React, {Component} from 'react'
import {connect} from 'react-redux'
import {} from 'react-icons/fa'
import userReducer from '../store/userReducer'
import {Bar, Line, Doughnut} from 'react-chartjs-2'
import {mapIcon} from '../helperfuncs'
import {gitCommitFunc} from '../helperfuncs'

const Eyes = mapIcon('eyes')
const Fork = mapIcon('fork')
const Stars = mapIcon('star')

const mapStateToProps = () => ({
  userId: userReducer.id
})

const mapDispatchToProps = dispatch => ({})

export const Github = connect(mapStateToProps, mapDispatchToProps)(
  class Github extends Component {
    constructor() {
      super()
    }
    render() {
      const {githubData} = this.props

      //Preparing github data
      const repos = githubData.repos || ''
      const repoData = repos.length
        ? repos.sort((a, b) => (a.repo_updated_at > b.repo_updated_at ? -1 : 1))
        : []
      const MostRecentRepo = repoData[0] || []
      const LanguageObj = {}

      //creates language obj
      const RepoLanguage =
        repoData
          .map(
            val => (typeof val.language === 'object' ? 'None' : val.language)
          )
          .map(
            curr =>
              LanguageObj[curr] ? LanguageObj[curr]++ : (LanguageObj[curr] = 1)
          ) || ''

      //Generates language date
      const LanguageData = Object.keys(LanguageObj).map(
        language => LanguageObj[language]
      )
      const data = {
        labels: Object.keys(LanguageObj),
        datasets: [
          {
            label: 'Languages used in Repos',
            data: LanguageData,
            fill: true,
            backgroundColor: [
              'rgba(255, 99, 132)',
              'rgba(54, 162, 235)',
              'rgba(255, 206, 86)',
              'rgba(75, 192, 192)',
              'rgba(153, 102, 255)',
              'rgba(255, 159, 64)',
              'rgba(255, 99, 132)',
              'rgba(54, 162, 235)',
              'rgba(255, 206, 86)',
              'rgba(75, 192, 192)',
              'rgba(153, 102, 255)',
              'rgba(255, 159, 64)'
            ],
            borderColor: 'white' // Line color
          }
        ]
      }

      const options = {
        legend: {
          display: false
        }
      }

      //dated sorted and most recent
      const commits = githubData.commits || ''
      // const commitDate = commits.length > 1 ? gitCommitFunc(commits) : [];

      return (
        <a
          className="github"
          href={`http://www.github.com/${this.props.userName}`}
          target="_blank"
        >
          <div className="githubLeft">
            <div>
              <h4> Most Recent Repo</h4>
              <h4> {`${MostRecentRepo.name}`} </h4>
            </div>
            <div className="githubTable">
              <Eyes className="githubLogo" />
              <h4>{`${MostRecentRepo.watchers}`}</h4>
            </div>
            <div className="githubTable">
              <Fork className="githubLogo" />
              <h4>{`${MostRecentRepo.forks}`}</h4>
            </div>
            <div className="githubTable">
              <Stars className="githubLogo" />
              <h4>{`${MostRecentRepo.stars}`}</h4>
            </div>
          </div>
          <div className="githubRight">
            <Bar data={data} height={250} options={options} />
          </div>
        </a>
      )
    }
  }
)
