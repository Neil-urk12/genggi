import { describe, expect, it } from "vitest";
import {
    encodeMultipartTextField,
    decodeMultipartTextField,
} from "./form-encoding";

describe("multipart text field encoding", () => {
    it("round-trips markup-like layout CSS", () => {
        const css = [
            "@import url(\"https://example.com/x.css\");",
            "<style>.profile-page { color: red; }</style>",
            "<?php echo 1; ?>",
            "<iframe src=x></iframe>",
        ].join("\n");
        const encoded = encodeMultipartTextField(css);
        // Base64 output must not contain the markup patterns edge WAFs flag.
        expect(encoded).not.toContain("<");
        expect(encoded).not.toContain("@import");
        expect(encoded).not.toContain("<?");
        expect(decodeMultipartTextField(encoded)).toBe(css);
    });

    it("round-trips multibyte text and empty values", () => {
        const text = "just try it🪙 · pasko ❤ <3";
        expect(decodeMultipartTextField(encodeMultipartTextField(text))).toBe(
            text,
        );
        expect(decodeMultipartTextField(encodeMultipartTextField(""))).toBe("");
    });

    it("leaves values without the encoding prefix untouched", () => {
        const plain = ".profile-page { background: url('x.png'); }";
        expect(decodeMultipartTextField(plain)).toBe(plain);
    });
});
