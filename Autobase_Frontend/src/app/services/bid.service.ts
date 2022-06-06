import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bid} from "../interface/bid";

@Injectable({
  providedIn: 'root'
})
export class BidService {

  //TODO real url
  private baseBidUrl = environment.apiUrl + "bids";

  constructor(private httpClient: HttpClient) { }

  getBids(): Observable<Bid[]> {
    return this.httpClient.get<Bid[]>(this.baseBidUrl);
  }

  getBid(id: number): Observable<Bid> {
    const bidUrl = `${this.baseBidUrl}/${id}`;

    return this.httpClient.get<Bid>(bidUrl);
  }

  createBid(bid: Bid): Observable<Bid>{
    return this.httpClient.post<Bid>(`${this.baseBidUrl}`,bid);
  }

  updateBid(id: number, bid: any): Observable<Bid> {
    const bidUrl = `${this.baseBidUrl}/${id}`;

    return this.httpClient.put<Bid>(bidUrl, bid);
  }

  deleteBid(id: number): Observable<unknown>{
    return this.httpClient.delete<unknown>(`${this.baseBidUrl}/${id}`);
  }
}
