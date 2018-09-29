// if the user want to use other version, e.g. from server,
// either load from <src> or fetch from server, then resolve from global var Horizon;
// or import from '@horizon/client'.
// Example:
// import _Horizon_ = require('@horizon/client');
// import { Horizon, HorizonConstructor } from 'typestub-horizon-client';
// export let _Horizon: HorizonConstructor = _Horizon_;

exports.Horizon = require('@horizon/client');
