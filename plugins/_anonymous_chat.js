let handler = m => m

handler.before = async function (m, { match }) {
    // if (match) return !1
    if (!m.chat.endsWith('@s.whatsapp.net')) return !0
    this.anonymous = this.anonymous ? this.anonymous : {}
    let room = Object.values(this.anonymous).find(room => [room.a, room.b].includes(m.sender) && room.state === 'CHATTING')
    if (room) {
        if (/^.*(next|leave|start|sendkontak)/.test(m.text)) return
        if (['.next', '.sendkontak', '.sendcontact', '.leave', '.start', 'Cari Partner', 'Keluar', 'Next'].includes(m.text)) return
        let other = [room.a, room.b].find(user => user !== m.sender)
        m.copyNForward(other, true, m.quoted && m.quoted.fromMe ? {
            contextInfo: {
                ...m.msg.contextInfo,
                forwardingScore: 1,
                isForwarded: true,
                participant: other
            }
        } : {})
    }
    return !0
}

module.exports = handler