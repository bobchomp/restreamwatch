#!/usr/bin/env python3
"""Raise the extension's patch version (1.0.3 -> 1.0.4) and build the store zip.

Usage:  python3 scripts/release.py           # bump version, then build zip
        python3 scripts/release.py --no-bump # only rebuild the zip
"""
import json
import pathlib
import re
import sys
import zipfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
EXT = ROOT / "extension"
STORE = ROOT / "store"
MANIFEST = EXT / "manifest.json"


def bump(version: str) -> str:
    parts = [int(p) for p in version.split(".")]
    parts[-1] += 1
    return ".".join(map(str, parts))


def main() -> None:
    text = MANIFEST.read_text()
    version = json.loads(text)["version"]

    if "--no-bump" not in sys.argv:
        new = bump(version)
        # Replace only the version line so the rest of the file keeps its formatting.
        text, n = re.subn(r'("version"\s*:\s*")[^"]+(")', rf"\g<1>{new}\g<2>", text, count=1)
        if n != 1:
            sys.exit("Could not find the version in manifest.json")
        MANIFEST.write_text(text)
        print(f"Version {version} -> {new}")
        version = new

    # Keep only the zip for the current version.
    for old in STORE.glob("*.zip"):
        old.unlink()

    out = STORE / f"rtmp-web-player-reminder-{version}.zip"
    files = sorted(p for p in EXT.rglob("*")
                   if p.is_file() and not any(part.startswith(".") for part in p.relative_to(EXT).parts))
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
        for f in files:
            z.write(f, f.relative_to(EXT).as_posix())
    print(f"Built {out.relative_to(ROOT)} ({len(files)} files)")


if __name__ == "__main__":
    main()
