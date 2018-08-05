import * as React from 'react'
import * as ReactDOM from 'react-dom'
import SoundCloud from './react-simple-soundcloud-widget'

const urls = [
	'https://soundcloud.com/joseph_weidinger/hmm-i-dont-know-with-lyrics-pop-electronic-version',
	'https://soundcloud.com/loopratpak/looprat-code-name-roshi',
	'https://soundcloud.com/timo-vaerigjarson/i-searched-myself'
]

class Everything extends React.Component<any, { index: number }> {
	constructor(props: any) {
		super(props)
		this.state = {
			index: 0
		}
	}

	render() {
		const { index } = this.state
		return (
			<div>
				<SoundCloud
					url={urls[index % urls.length]}
					config={{ visual: true }}
					onPlay={() => console.log('on play called')}
					onPause={() => console.log('on pause called')}
					onEnd={() => console.log('on end called')}
				/>
				<button onClick={() => this.setState({ index: index + 1 })}>
					Next Track
				</button>
			</div>
		)
	}
}

ReactDOM.render(<Everything />, document.getElementById('app'))
