import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AppModule } from '../app.module';

@Injectable({
    providedIn: 'root'
})
export class ERPApiService {

    uri = AppModule.ERP_API_URI;

    constructor(
        private http: HttpClient
    ) { }

  
    callMethod(Method: string, data: any = undefined): Observable<any> {
        let obsevable = undefined;
        if (data == undefined) {
            obsevable =this.http.get(this.uri + '/api/method/' + Method);
        } else {
            obsevable =this.http.post(this.uri + '/api/method/' + Method, data);
        }
        return obsevable.pipe(
            map((res: any) => {
                if (res.data != undefined) {
                    return res.data;
                } else {
                    return res;
                }
            })
        )
    }

    /**
     * 
     * @param doctype 
     * @param fields '"field1", "field2"'
     * @param filters '[["field1", "=", "value1"]]'
     * @returns 
     */
    getDoctype(doctype: string, fields: string = '', filters: string = undefined) {

        let url = (this.uri + '/api/resource/' + doctype) +
            (fields == '"*"' ? '?fields=["*"]' : '?fields=["name",' + fields + ']') +
            (filters == undefined ? '' : '&filters=' + filters);

        return this.http.get(url).pipe(
            map((res: any) => {
                if (res.data != undefined) {
                    return res.data;
                } else {
                    return res.message;
                }
            })
        )
    }
}
