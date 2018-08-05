import * as React from 'react'
import { createWidget } from './actions'

export interface ConfigType {
	auto_play?: boolean
	visual?: boolean
	buying?: boolean
	liking?: boolean
	download?: boolean
	sharing?: boolean
	show_artwork?: boolean
	show_comments?: boolean
	show_playcount?: boolean
	show_user?: boolean
	show_reposts?: boolean
	hide_related?: boolean
}

export interface ReactSimpleSoundCloudWidgetProps {
	url: string
	config?: ConfigType
	id?: string
	onPlay?: () => void
	onPause?: () => void
	onEnd?: () => void
}

class ReactSimpleSoundCloudWidget extends React.Component<
	ReactSimpleSoundCloudWidgetProps
> {
	static defaultProps: Partial<ReactSimpleSoundCloudWidgetProps>
	private internalWidget: any = null

	constructor(props: ReactSimpleSoundCloudWidgetProps) {
		super(props)
	}

	public componentDidMount() {
		createWidget(this.props.id, widget => {
			this.setupWidget(widget)
			this.reloadWidget()
		})
	}

	public shouldComponentUpdate(nextProps: ReactSimpleSoundCloudWidgetProps) {
		return nextProps.url !== this.props.url
	}

	public componentDidUpdate() {
		this.reloadWidget()
	}

	public componentWillUnmount() {
		const win: any = window
		this.internalWidget.unbind(win.SC.Widget.Events.PLAY)
		this.internalWidget.unbind(win.SC.Widget.Events.PAUSE)
		this.internalWidget.unbind(win.SC.Widget.Events.FINISH)
	}

	private setupWidget(widget: any) {
		const win: any = window
		this.internalWidget = widget
		this.internalWidget.bind(win.SC.Widget.Events.PLAY, this.props.onPlay)
		this.internalWidget.bind(win.SC.Widget.Events.PAUSE, this.props.onPause)
		this.internalWidget.bind(win.SC.Widget.Events.FINISH, this.props.onEnd)
	}

	private reloadWidget() {
		this.internalWidget.load(this.props.url, { ...this.props.config })
	}

	public render() {
		return (
			<iframe
				id={this.props.id}
				width="100%"
				height={this.props.config.visual ? '450' : '166'}
				scrolling="no"
				frameBorder="no"
				src="https://w.soundcloud.com/player/?url="
			/>
		)
	}
}

ReactSimpleSoundCloudWidget.defaultProps = {
	id: 'react-sc-widget',
	config: {},
	onPlay: () => {},
	onPause: () => {},
	onEnd: () => {}
}

export default ReactSimpleSoundCloudWidget
