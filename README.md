# TypeStub for @horizon/client
source: https://github.com/beenotung/typed-horizon

## TL;DL
It is hard to use typings with Ionic2 (Angular2), this repo try to fix it (or workaround with it).

## Example
```typescript
import * as Horizon from "@horizon/client/dist/horizon";
import * as typeStubHorizon from "../lib/typeStub-horizon-client/index";

let hz:typeStubHorizon.Horizon = Horizon();
hz.onReady(()=>console.log('ready'));
hz.connect();
```
