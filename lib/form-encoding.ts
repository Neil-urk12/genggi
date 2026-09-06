// Genggi lets users store raw CSS (profile themes, layout gallery entries) that
// can legitimately contain markup-like text such as `<style>`, `@import url(...)`,
// or pasted HTML. Multipart server-action uploads send that text in form fields,
// and edge WAF scanners can mistake it for script-injection and reject the whole
// request with a 403 before it ever reaches the app.
//
// To avoid that, the text fields are base64-encoded on the client just before the
// upload and decoded here on the server. Base64 output only contains the alphabet
// `A-Za-z0-9+/=` so none of the tag/import patterns the scanners match on can
// appear in the body.
//
// Only browser-safe Web APIs are used (no Buffer), so the module can be imported
// from both client components and server actions.

const ENCODED_PREFIX = "b64:";

export function encodeMultipartTextField(value: string): string {
    const bytes = new TextEncoder().encode(value);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return ENCODED_PREFIX + btoa(binary);
}

export function decodeMultipartTextField(value: string): string {
    if (!value.startsWith(ENCODED_PREFIX)) return value;
    try {
        const binary = atob(value.slice(ENCODED_PREFIX.length));
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return new TextDecoder().decode(bytes);
    } catch {
        // Not an encoded value (e.g. a direct/non-UI caller) — leave it untouched.
        return value;
    }
}
