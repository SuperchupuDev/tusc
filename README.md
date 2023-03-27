# tusc

If you want something more stable and easy to use, check out [tusc-gui][tusc-gui]

A wrapper around [yt-dlp][yt-dlp] that makes it easier to use for non-technical users

It's on an early stage with a lot of changes expected to happen, if you want something stable, you should probably use its JavaScript API, [tusc-gui][tusc-gui], or [yt-dlp][yt-dlp] directly

## Installation

```sh-session
npm i -g @superchupu/tusc
```

Windows is the only supported platform for now

## Usage

```bash
tusc <url> [options]
```

### Options

`-e` - Makes explorer not open on finish

`--update` - Updates tusc's yt-dlp installation

## API

```ts
import { run } from '@superchupu/tusc';

await run({
  url: 'https://youtu.be/7cXgViHb4NM',
  resolution: 1080,
  extension: 'mp4',
  openExplorer: false
});
```

### Options

```ts
export interface TuscOptions {
  extension?: Extension;
  onData?: (data: string) => unknown;
  onErrorData?: (data: string) => unknown;
  openExplorer: boolean;
  path: string;
  resolution?: number | 'best';
  url: string | null;
  ytDlpPath?: string;
}
```

[tusc-gui]: https://github.com/SuperchupuDev/tusc-gui
[yt-dlp]: https://github.com/yt-dlp/yt-dlp
