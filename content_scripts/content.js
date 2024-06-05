const agentSources = [
	{ agentName: 'jielv', domain: 'ebooking.jladmin.cn' },
	{ agentName: 'kingsley', domain: 'www.ql-gz.com/ebooking' },
	{ agentName: 'ctrip', domain: 'ebooking.ctrip.com' },
	{ agentName: 'meituan', domain: 'eb.meituan.com' },
	{ agentName: 'fliggy', domain: 'hotel.fliggy.com' },
	// { agentName: '微信商城', domain: 'ebooking.jladmin.cn' },
	{ agentName: 'email', domain: 'mail.qiye.163.com' },
]

function sendToClipboard(resvJsonString) {	
	console.log(JSON.parse(resvJsonString))

	const textArea = document.createElement('textarea')
	textArea.value = resvJsonString

	document.body.appendChild(textArea)
	textArea.select()
	document.execCommand('Copy')
	textArea.remove()
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
	const url = req.url
	let curAgent = ''
	for (const agent of agentSources) {
		if (url.indexOf(agent.domain) !== -1) {
			curAgent = agent.agentName
		}
	}

	switch (curAgent) {
		case 'jielv':
			sendToClipboard(Jielv())
			break
		case 'kingsley':
			sendToClipboard(Kingsley())
			break
		case 'meituan':
			sendToClipboard(Meituan())
		break
		case 'ctrip':
			sendToClipboard(Ctrip())
			break
		case 'fliggy':
			sendToClipboard(Fliggy())
			break
		case 'email':
			emailBookings()
			break
	}
})
