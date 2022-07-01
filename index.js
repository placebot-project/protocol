function putUint32(b, offset, n) {
	let view = new DataView(b);
	view.setUint32(offset, n, false);
}

function getUint32(b, offset) {
	let view = new DataView(b);
	return view.getUint32(offset, false);
}

class PixelEvent {
	constructor(x, y, color) {
		this.x = x;
		this.y = y;
		this.color = color;
	}

	encode() {
		let data = new Uint8Array(11);

		putUint32(data.buffer, 0, this.x);
		putUint32(data.buffer, 4, this.y);

		for (let i = 0; i < 3; i++) {
			data[8 + i] = this.color[i];
		}

		return data;
	}
}

PixelEvent.decode = (message) => {
	if (message.length != 11) {
		throw new Error("Incorrect size!");
	}

	return new PixelEvent(getUint32(message.buffer, 0), getUint32(message.buffer, 4), new Uint8Array(message.slice(8)));
};

module.exports.PixelEvent = PixelEvent;