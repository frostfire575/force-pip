# Force Picture-in-Picture: Chrome extension for anime and streaming video

Force Picture-in-Picture is a Chrome extension that lets you watch video in a floating window while you work in other tabs. It is aimed at anime streaming sites such as Crunchyroll, where the player often hides or disables Chrome's PiP button.

Some sites put `disablepictureinpicture` on their `<video>` elements, so Chrome's PiP button is greyed out or missing. This extension removes that attribute, and removes it again if the site puts it back. It also adds an `Alt+P` shortcut that pops the largest loaded video on the page into a PiP window. Press `Alt+P` again to close it.

## Install from source

1. Clone or download this repository.
2. Open `chrome://extensions` and turn on Developer mode.
3. Click Load unpacked and select the repository folder.

## Use

Open a page with a video, start playing, and press `Alt+P`. If a page has several videos, the one with the most pixels that has loaded data is picked. If nothing happens, check the page console for a `[Force PiP]` warning.

## Limits

The extension only removes the PiP block attribute. If a site's player blocks PiP some other way, for example an iframe without the `picture-in-picture` permission, `Alt+P` will do nothing there. It does not touch DRM or encrypted media. Some sites use `Alt+P` themselves; the extension grabs the key first, so the site's shortcut stops working there.

The content script runs on all pages and in all frames at `document_start`. That is how it catches videos before the site can block them. It has no extra permissions.

## Privacy

The extension collects nothing and makes no network requests. See [PRIVACY.md](PRIVACY.md).

## License

MIT
