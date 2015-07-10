# Request Size Limiter Filter

Request size limiter filter for [Clyde](https://github.com/acanimal/clyde) API gateway, which allows blocks request depending on its body's length.

> Implementation is based on on [raw-body](https://github.com/stream-utils/raw-body) module.

<!-- MarkdownTOC -->

- [Configuration](#configuration)
  - [Examples](#examples)
    - [Block requests with body longer than 100 bytes:](#block-requests-with-body-longer-than-100-bytes)
    - [Blocks request with content length different than 1kb](#blocks-request-with-content-length-different-than-1kb)
  - [Notes](#notes)
- [License](#license)

<!-- /MarkdownTOC -->

## Configuration

The filter wraps the [raw-body](https://github.com/stream-utils/raw-body) module configuration options:

- `limit` - The byte limit of the body. If the body ends up being larger than this limit, a `413` error code is returned. You can specify values in string format: `30kb`, `1mb`, ... (internally [bytes](https://github.com/visionmedia/bytes.js) module is used).
- `length` - The length of the stream. If the contents of the stream do not add up to this length, an `400` error code is returned.
- `encoding` - The requested encoding. By default, a `Buffer` instance will be returned. Default encoding is `utf8`. You can use any type of encoding supported by [iconv-lite](https://www.npmjs.org/package/iconv-lite#readme).


## Examples

### Block requests with body longer than 100 bytes:

```javascript
{
  "prefilters" : [
    {
      "id" : "size-limiter",
      "path" : "request-size-limiter",
      "config" : {
        "limit" : "100b"
      }
    }
    ...
  ]
}
```

### Blocks request with content length different than 1kb

```javascript
{
  "prefilters" : [
    {
      "id" : "size-limiter",
      "path" : "request-size-limiter",
      "config" : {
        "length" : 1024
      }
    }
    ...
  ]
}
```

## Notes

* It must be configured as a global or provider's prefilter. It has no sense as a postfilter.


# License

The MIT License (MIT)

Copyright (c) 2015 Antonio Santiago (@acanimal)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
