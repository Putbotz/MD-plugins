let fetch = require('node-fetch')
let handler = async (m, { text, command, usedPrefix }) => {
    if (!text) throw `contoh:\n${usedPrefix + command} baileys\nIngat! ini untuk mencari melalui nama *repository* Bukan Melalui username!`
    await m.reply('_Wait a minute, Request in progress...._')
    let res = await fetch(global.API('https://api.github.com', '/search/repositories', {
        q: text
    }))
    if (!res.ok) throw await `${res.status} ${res.statusText}`
    let json = await res.json()
    if (res.status !== 200) throw json
    let str = json.items.map((repo, index) => {
        return `
${1 + index}. *${repo.full_name}*${repo.fork ? ' (fork)' : ''}
_${repo.html_url}_
_Dibuat pada *${formatDate(repo.created_at)}*_
_Terakhir update pada *${formatDate(repo.updated_at)}*_
👁  ${repo.watchers}   🍴  ${repo.forks}   ⭐  ${repo.stargazers_count}
${repo.open_issues} Issue${repo.description ? `
*Deskripsi:*\n${repo.description}` : ''}
*Clone:* \`\`\`$ git clone ${repo.clone_url}\`\`\`
`.trim()
    }).join('\n\n')
    m.reply(str)
}
handler.help = ['githubsearch'].map(v => v + ' <pencarian>')
handler.tags = ['github']

handler.command = /^g(ithub|h)search$/i
handler.limit = 1

module.exports = handler

function formatDate(n, locale = 'id') {
    let d = new Date(n)
    return d.toLocaleDateString(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    })
}
