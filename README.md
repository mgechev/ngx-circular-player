# NgxCircularPlayer

A circular player for Angular.

## Usage

```bash
npm i ngx-circular-player --save
```

After that in your `AppModule`:

```ts
import { NgxCircularPlayerModule } from 'ngx-circular-player';

@NgModule({
  imports: [NgxCircularPlayerModule],
  ...
})
export class AppModule {}
```

You can use the player in your template by:

```html
<ngx-circular-player source="mysong.mp3"></ngx-circular-player>
```

## Configuration

You can specify the following inputs:

- `source` - Specifies the audio file.
- `radius` - Specifies the radius of the player. Default value `120`.
- `stroke` - Specifies the stroke width. Default value `20`.
- `innerStroke` - Specifies the inner stroke width. Default value `2`.
- `strokeColor` - Specifies the stroke color. Default value `#fff`.
- `progressStrokeColor` - Specifies the color of the stroke indicating the progress. Default value `#858585`.
- `innerStrokeColor` - Specifies the inner stroke color. Default value `#eee`.

## License

MIT
