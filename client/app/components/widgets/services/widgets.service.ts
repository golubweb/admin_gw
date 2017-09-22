import { Observable }                              from 'rxjs/Observable';
import { Injectable, EventEmitter }                from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import Widgets from '../interfaces/widgets.interface';

@Injectable()
export default class WidgetsService {
    widgetsData: Widgets[] = [];

    private headersJson = new Headers({ 'Content-Type': 'application/json' });
    private optionJson  = new RequestOptions({ headers: this.headersJson });

    constructor(private _http: Http) {}

    public getAll(): Observable {
        const url = '/api/data/widgets';

        return this._http.get(url, this.optionJson).map((data: Response) => {
            this.widgetsData = data.json();

            return this.widgetsData.widgets;
        });
    }
}
