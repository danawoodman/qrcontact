# qrcontact

> Generate a vCard QR code that anyone can scan to add your contact details to their contacts list!

[qrcontact.danawoodman.com](https://qrcontact.danawoodman.com)

#### How it works:

1. Enter your contact info (as much or as little as you want)
2. Download the QR code that is automatically created
3. Share the QR code with someone who wants your contact info (print on your business card, make a sticker you put anywhere, tattoo it, whatever you want!)
4. Someone scans this QR code on their phone and then can quickly add you to their contacts list!

#### Features

- **🧘 Flexible** - Add as many contact details as you want!
- **🔌 Works offline!** - Will work even if you're not connected to the internet, using Service Workers.
- **💾 Locally saved data** - Your contact details are stored locally in localstorage.
- **☀️🌙 Automatic light/dark mode support** - Using TailwindCSS's `dark:` attribute, including a dark/light mode favicon!
- **🎚 Page transitions** - Pages fade in and out when you navigate.
- **💅 Subtle animations** - Adding/removing items fade out, buttons have color transitions, etc.

#### Tools used

- [SvelteKit](https://kit.svelte.dev)
- [TailwindCSS](https://tailwindcss.com/)
- [qrcode](https://www.npmjs.com/package/qrcode)
- [just](https://github.com/angus-c/just)

## Development

```shell
npm install
npm run dev
```

## Todos

- Export in multiple formats (e.g. SVG)
- Photo uploading (only way to do this would be to upload and host the image somewhere as there is a max size for a QR code)

## References

- [vCard](https://en.wikipedia.org/wiki/VCard) - The format for generating vCards
- [node-qrcode](https://github.com/soldair/node-qrcode) - The library sed to generate QR codes
- [bitly's vcard creator](https://www.qr-code-generator.com/solutions/vcard-qr-code/) - Way more robust version of this app 😅
<!-- - https://www.npmjs.com/package/qrcode-svg
- https://github.com/kozakdenys/qr-code-styling -->
