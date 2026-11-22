export function parse(traceparent: string) {
    const parts = traceparent.split("-");
    const [version, traceId, spanId, flags] = parts;

    if(parts.length !==4 ) { return null; }
    if(version !== "00") { return null; }

    if (!/^[0-9a-f]{32}$/.test(traceId)) { return null; }
    if (!/^[0-9a-f]{16}$/.test(spanId)) { return null; }
    if (!/^[0-9a-f]{2}$/.test(flags)) { return null; }

    if(traceId === "0".repeat(32)) { return null; }
    if(spanId === "0".repeat(16)) { return null; }

    return {version, traceId, spanId, flags};
}

export function newTraceId() {
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    const list = Array.from(bytes);
    const id = list.map((n) => 
        n.toString(16).padStart(2, "0")
    ).join("");

    if(id === "0".repeat(32)) {
        return newTraceId();
    }else {
        return id;
    }
}

export function newSpanId() {
    const bytes = crypto.getRandomValues(new Uint8Array(8));
    const list = Array.from(bytes);
    const id = list.map((n) => 
        n.toString(16).padStart(2, "0")
    ).join("");

    if(id === "0".repeat(16)) {
        return newSpanId();
    }else {
        return id;
    }
    
}

export function format(traceId: string, spanId: string) : string{
    return ["00", traceId, spanId, "01"].join("-")
}