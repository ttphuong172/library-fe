import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RackService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  findAll() {
    return this.httpClient.get('http://localhost:8080/api/racks')
  }

  findById(id: any) {
    return this.httpClient.get('http://localhost:8080/api/racks/' + id)
  }

  findAllByLibrary_Name(name: any) {
    return this.httpClient.get('http://localhost:8080/api/racks/library/' + name)
  }

  save(rack: any) {
    return this.httpClient.post('http://localhost:8080/api/racks', rack)
  }

  update(rack: any) {
    return this.httpClient.put('http://localhost:8080/api/racks/' + rack.id, rack)
  }
}
