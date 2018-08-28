import * as React from 'react'
import { createWidget } from './actions'
import { InfoType, ConfigType, WidgetType } from './types'

const defaultId = 'react-sc-widget'

export interface ReactSimpleSoundCloudWidgetProps {
	url: string
	id?: string
	config?: ConfigType
	onPlay?: (info: InfoType) => void
	onPause?: (info: InfoType) => void
	onEnd?: (info: InfoType) => void
	onReady?: () => void
}

class ReactSimpleSoundCloudWidget extends React.Component<
	ReactSimpleSoundCloudWidgetProps
> {
	static defaultProps: Partial<ReactSimpleSoundCloudWidgetProps>
	private internalWidget: WidgetType | null = null

	constructor(props: ReactSimpleSoundCloudWidgetProps) {
		super(props)
	}

	public componentDidMount(): void {
		createWidget(this.props.id || defaultId, (widget: WidgetType) => {
			this.setupWidget(widget)
			this.reloadWidget()
		})
	}

	public shouldComponentUpdate(
		nextProps: ReactSimpleSoundCloudWidgetProps
	): boolean {
		return nextProps.url !== this.props.url
	}

	public componentDidUpdate(): void {
		this.reloadWidget()
	}

	public componentWillUnmount(): void {
		const win: any = window
		if (!this.internalWidget) return
		this.internalWidget.unbind(win.SC.Widget.Events.PLAY)
		this.internalWidget.unbind(win.SC.Widget.Events.PAUSE)
		this.internalWidget.unbind(win.SC.Widget.Events.FINISH)
		this.internalWidget.unbind(win.SC.Widget.Events.READY)
	}

	private setupWidget(widget: WidgetType): void {
		const win: any = window
		this.internalWidget = widget
		this.internalWidget.bind(win.SC.Widget.Events.PLAY, this.props.onPlay)
		this.internalWidget.bind(win.SC.Widget.Events.PAUSE, this.props.onPause)
		this.internalWidget.bind(win.SC.Widget.Events.FINISH, this.props.onEnd)
		this.internalWidget.bind(win.SC.Widget.Events.READY, this.props.onReady)
	}

	private reloadWidget(): void {
		if (!this.internalWidget) return
		this.internalWidget.load(this.props.url, { ...this.props.config })
	}

	public render() {
		const { config, url, id } = this.props
		return (
			<iframe
				id={id || defaultId}
				width="100%"
				height={config && config.visual ? '450' : '166'}
				scrolling="no"
				frameBorder="no"
				src={`https://w.soundcloud.com/player/?url=${url}`}
			/>
		)
	}
}

ReactSimpleSoundCloudWidget.defaultProps = {
	config: {},
	onPlay: () => {},
	onPause: () => {},
	onEnd: () => {}
}

export default ReactSimpleSoundCloudWidget
