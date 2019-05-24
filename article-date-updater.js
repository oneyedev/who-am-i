const Git = require('nodegit')
const fs = require('fs')
const path = require('path')
const articlePath = path.resolve('src/assets/articles/articles.json')
fs.readFile(articlePath, 'utf8', (err, data) => {
  const articles = JSON.parse(data)
  Git.Repository.open('.').then(async repo => {
    return Promise.all(articles.map(article => update(repo, article)))
      .catch(reason => {
        console.warn(reason)
      })
      .finally(() => {
        repo.cleanup()
        const newData = JSON.stringify(articles, null, 4)
        fs.writeFileSync(articlePath, newData, 'utf8')
      })
  })
})

function update(repo, article) {
  const id = article.to
  const filePath = `src/assets/articles/${id}.md`
  return new Promise(async (resolve, reject) => {
    const walker = await repo.createRevWalk()
    walker.pushHead()
    walker.sorting(Git.Revwalk.SORT.TIME)
    const result = await walker.fileHistoryWalk(filePath, 100000)
    if (result.length === 0) {
      reject(new Error(`Commit history not exist for article "${id}"`))
    } else {
      article.regTime = result[result.length - 1].commit.timeMs()
      article.chgTime = result[0].commit.timeMs()
      resolve(article)
    }
  })
}
