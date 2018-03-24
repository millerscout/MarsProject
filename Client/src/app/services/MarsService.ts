/* tslint:disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v11.16.0.0 (NJsonSchema v9.10.39.0 (Newtonsoft.Json v9.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpResponseBase, HttpErrorResponse } from '@angular/common/http';

export module MarsService {
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export interface IClient {
    /**
     * @cc (optional)
     * @return Success
     */
    apiCommandCenterSaveCommandsByWorldIdPut(worldId: string, cc: CommandCenter | null | undefined): Observable<void>;
    /**
     * @pos (optional)
     * @return Success
     */
    apiCommandCenterAddProbeByWorldIdPost(worldId: string, pos: Position | null | undefined): Observable<CommandCenter>;
    /**
     * @cc (optional)
     * @return Success
     */
    apiCommandCenterMoveProbesPost(cc: CommandCenter | null | undefined): Observable<CommandCenter>;
    /**
     * @return Success
     */
    apiMarsGet(): Observable<World[]>;
    /**
     * @world (optional)
     * @return Success
     */
    apiMarsPut(world: World | null | undefined): Observable<void>;
    /**
     * @grid (optional)
     * @return Success
     */
    apiMarsPost(grid: Grid | null | undefined): Observable<World>;
    /**
     * @return Success
     */
    apiMarsByIdGet(id: string): Observable<World>;
    /**
     * @return Success
     */
    apiMarsByIdDelete(id: string): Observable<void>;
}

@Injectable()
export class Client implements IClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    /**
     * @cc (optional)
     * @return Success
     */
    apiCommandCenterSaveCommandsByWorldIdPut(worldId: string, cc: CommandCenter | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/CommandCenter/saveCommands/{worldId}";
        if (worldId === undefined || worldId === null)
            throw new Error("The parameter 'worldId' must be defined.");
        url_ = url_.replace("{worldId}", encodeURIComponent("" + worldId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(cc);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
            })
        };

        return this.http.request("put", url_, options_).flatMap((response_ : any) => {
            return this.processApiCommandCenterSaveCommandsByWorldIdPut(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processApiCommandCenterSaveCommandsByWorldIdPut(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processApiCommandCenterSaveCommandsByWorldIdPut(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @pos (optional)
     * @return Success
     */
    apiCommandCenterAddProbeByWorldIdPost(worldId: string, pos: Position | null | undefined): Observable<CommandCenter> {
        let url_ = this.baseUrl + "/api/CommandCenter/addProbe/{worldId}";
        if (worldId === undefined || worldId === null)
            throw new Error("The parameter 'worldId' must be defined.");
        url_ = url_.replace("{worldId}", encodeURIComponent("" + worldId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(pos);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).flatMap((response_ : any) => {
            return this.processApiCommandCenterAddProbeByWorldIdPost(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processApiCommandCenterAddProbeByWorldIdPost(<any>response_);
                } catch (e) {
                    return <Observable<CommandCenter>><any>Observable.throw(e);
                }
            } else
                return <Observable<CommandCenter>><any>Observable.throw(response_);
        });
    }

    protected processApiCommandCenterAddProbeByWorldIdPost(response: HttpResponseBase): Observable<CommandCenter> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? CommandCenter.fromJS(resultData200) : new CommandCenter();
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<CommandCenter>(<any>null);
    }

    /**
     * @cc (optional)
     * @return Success
     */
    apiCommandCenterMoveProbesPost(cc: CommandCenter | null | undefined): Observable<CommandCenter> {
        let url_ = this.baseUrl + "/api/CommandCenter/moveProbes";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(cc);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).flatMap((response_ : any) => {
            return this.processApiCommandCenterMoveProbesPost(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processApiCommandCenterMoveProbesPost(<any>response_);
                } catch (e) {
                    return <Observable<CommandCenter>><any>Observable.throw(e);
                }
            } else
                return <Observable<CommandCenter>><any>Observable.throw(response_);
        });
    }

    protected processApiCommandCenterMoveProbesPost(response: HttpResponseBase): Observable<CommandCenter> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? CommandCenter.fromJS(resultData200) : new CommandCenter();
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<CommandCenter>(<any>null);
    }

    /**
     * @return Success
     */
    apiMarsGet(): Observable<World[]> {
        let url_ = this.baseUrl + "/api/Mars";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processApiMarsGet(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processApiMarsGet(<any>response_);
                } catch (e) {
                    return <Observable<World[]>><any>Observable.throw(e);
                }
            } else
                return <Observable<World[]>><any>Observable.throw(response_);
        });
    }

    protected processApiMarsGet(response: HttpResponseBase): Observable<World[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [];
                for (let item of resultData200)
                    result200.push(World.fromJS(item));
            }
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<World[]>(<any>null);
    }

    /**
     * @world (optional)
     * @return Success
     */
    apiMarsPut(world: World | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/Mars";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(world);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
            })
        };

        return this.http.request("put", url_, options_).flatMap((response_ : any) => {
            return this.processApiMarsPut(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processApiMarsPut(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processApiMarsPut(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @grid (optional)
     * @return Success
     */
    apiMarsPost(grid: Grid | null | undefined): Observable<World> {
        let url_ = this.baseUrl + "/api/Mars";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(grid);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).flatMap((response_ : any) => {
            return this.processApiMarsPost(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processApiMarsPost(<any>response_);
                } catch (e) {
                    return <Observable<World>><any>Observable.throw(e);
                }
            } else
                return <Observable<World>><any>Observable.throw(response_);
        });
    }

    protected processApiMarsPost(response: HttpResponseBase): Observable<World> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? World.fromJS(resultData200) : new World();
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<World>(<any>null);
    }

    /**
     * @return Success
     */
    apiMarsByIdGet(id: string): Observable<World> {
        let url_ = this.baseUrl + "/api/Mars/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processApiMarsByIdGet(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processApiMarsByIdGet(<any>response_);
                } catch (e) {
                    return <Observable<World>><any>Observable.throw(e);
                }
            } else
                return <Observable<World>><any>Observable.throw(response_);
        });
    }

    protected processApiMarsByIdGet(response: HttpResponseBase): Observable<World> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? World.fromJS(resultData200) : new World();
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<World>(<any>null);
    }

    /**
     * @return Success
     */
    apiMarsByIdDelete(id: string): Observable<void> {
        let url_ = this.baseUrl + "/api/Mars/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
            })
        };

        return this.http.request("delete", url_, options_).flatMap((response_ : any) => {
            return this.processApiMarsByIdDelete(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processApiMarsByIdDelete(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processApiMarsByIdDelete(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }
}

export class CommandCenter implements ICommandCenter {
    probes?: Probe[] | undefined;

    constructor(data?: ICommandCenter) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            if (data["probes"] && data["probes"].constructor === Array) {
                this.probes = [];
                for (let item of data["probes"])
                    this.probes.push(Probe.fromJS(item));
            }
        }
    }

    static fromJS(data: any): CommandCenter {
        data = typeof data === 'object' ? data : {};
        let result = new CommandCenter();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (this.probes && this.probes.constructor === Array) {
            data["probes"] = [];
            for (let item of this.probes)
                data["probes"].push(item.toJSON());
        }
        return data;
    }
}

export interface ICommandCenter {
    probes?: Probe[] | undefined;
}

export class Probe implements IProbe {
    publicId?: string | undefined;
    order?: number | undefined;
    commands?: Commands[] | undefined;
    currentPosition?: Position | undefined;

    constructor(data?: IProbe) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.publicId = data["publicId"];
            this.order = data["order"];
            if (data["commands"] && data["commands"].constructor === Array) {
                this.commands = [];
                for (let item of data["commands"])
                    this.commands.push(item);
            }
            this.currentPosition = data["currentPosition"] ? Position.fromJS(data["currentPosition"]) : <any>undefined;
        }
    }

    static fromJS(data: any): Probe {
        data = typeof data === 'object' ? data : {};
        let result = new Probe();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["publicId"] = this.publicId;
        data["order"] = this.order;
        if (this.commands && this.commands.constructor === Array) {
            data["commands"] = [];
            for (let item of this.commands)
                data["commands"].push(item);
        }
        data["currentPosition"] = this.currentPosition ? this.currentPosition.toJSON() : <any>undefined;
        return data;
    }
}

export interface IProbe {
    publicId?: string | undefined;
    order?: number | undefined;
    commands?: Commands[] | undefined;
    currentPosition?: Position | undefined;
}

export class Position implements IPosition {
    x?: string | undefined;
    y?: string | undefined;
    direction?: PositionDirection | undefined;

    constructor(data?: IPosition) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.x = data["x"];
            this.y = data["y"];
            this.direction = data["direction"];
        }
    }

    static fromJS(data: any): Position {
        data = typeof data === 'object' ? data : {};
        let result = new Position();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["x"] = this.x;
        data["y"] = this.y;
        data["direction"] = this.direction;
        return data;
    }
}

export interface IPosition {
    x?: string | undefined;
    y?: string | undefined;
    direction?: PositionDirection | undefined;
}

export class World implements IWorld {
    grid?: Grid | undefined;
    publicId?: string | undefined;
    commandCenter?: CommandCenter | undefined;

    constructor(data?: IWorld) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.grid = data["grid"] ? Grid.fromJS(data["grid"]) : <any>undefined;
            this.publicId = data["publicId"];
            this.commandCenter = data["commandCenter"] ? CommandCenter.fromJS(data["commandCenter"]) : <any>undefined;
        }
    }

    static fromJS(data: any): World {
        data = typeof data === 'object' ? data : {};
        let result = new World();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["grid"] = this.grid ? this.grid.toJSON() : <any>undefined;
        data["publicId"] = this.publicId;
        data["commandCenter"] = this.commandCenter ? this.commandCenter.toJSON() : <any>undefined;
        return data;
    }
}

export interface IWorld {
    grid?: Grid | undefined;
    publicId?: string | undefined;
    commandCenter?: CommandCenter | undefined;
}

export class Grid implements IGrid {
    x?: number | undefined;
    y?: number | undefined;

    constructor(data?: IGrid) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.x = data["x"];
            this.y = data["y"];
        }
    }

    static fromJS(data: any): Grid {
        data = typeof data === 'object' ? data : {};
        let result = new Grid();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["x"] = this.x;
        data["y"] = this.y;
        return data;
    }
}

export interface IGrid {
    x?: number | undefined;
    y?: number | undefined;
}

export enum Commands {
    _0 = 0,
    _1 = 1,
    _2 = 2,
}

export enum PositionDirection {
    _0 = 0,
    _1 = 1,
    _2 = 2,
    _3 = 3,
}

export class SwaggerException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if(result !== null && result !== undefined)
        return Observable.throw(result);
    else
        return Observable.throw(new SwaggerException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = function() {
                observer.next(this.result);
                observer.complete();
            }
            reader.readAsText(blob);
        }
    });
}

}
