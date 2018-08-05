import * as load from 'load-script'

export function createWidget(id: string, cb: (widget: any) => void) {
	return load('https://w.soundcloud.com/player/api.js', () => {
		return cb((<any>window).SC.Widget(id))
	})
}
