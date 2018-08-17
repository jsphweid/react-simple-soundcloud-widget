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

export interface InfoType {
	currentPosition: number
	loadedProgress: number
	relativePosition: number
	soundId: number
}

export interface WidgetType {
	bind: Function
	unbind: Function
	load: Function
}
