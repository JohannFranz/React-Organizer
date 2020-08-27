class Appointment {
  constructor(id, start, end, header, text) {
    this.start = start;
    this.end = end;
    this.text = text;
    this.header = header;
    this.id = id;
  }

  getId() {
    return this.id;
  }
  setId(id) {
    this.id = id;
  }

  getStart() {
    return this.start;
  }
  setStart(start) {
    this.start = start;
  }

  getEnd() {
    return this.end;
  }
  setEnd(start) {
    this.end = start;
  }

  getText() {
    return this.text;
  }
  setText(text) {
    this.text = text;
  }

  getHeader() {
    return this.header;
  }
  setHeader(header) {
    this.header = header;
  }
}

export { Appointment };
