import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { TreeNode } from "primeng/api";



@Injectable()
export class NodeService {

    constructor(private http: Http) {}

    getFiles() {
        return this.http.get('http://200.98.131.74:4200/assets/json/files.json')
                    .toPromise()
                    .then(res => <TreeNode[]> res.json().data);
    }
}
