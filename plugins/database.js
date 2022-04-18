let handler = async (m) => {
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    m.reply(`*Jumlah database saat ini ${totalreg} user*\n*Jumlah user yg sudah terdaftar ${rtotalreg}*`)
}
handler.help = ['database', 'user']
handler.tags = ['info']
handler.command = /^(database|user)$/i
module.exports = handler
