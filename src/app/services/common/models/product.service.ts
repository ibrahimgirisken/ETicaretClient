import { List_Product } from './../../../contracts/list_product';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Create_Product } from './../../../contracts/create_product';
import { HttpClientService } from './../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) {}

  create(
    product: Create_Product,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .post(
        {
          controller: 'products',
        },
        product
      )
      .subscribe(
        (result) => {
          successCallBack();
        },
        (errorResponse: HttpErrorResponse) => {
          const _error: Array<{ key: string; value: Array<string> }> =
            errorResponse.error;
          let message = '';
          _error.forEach((v, index) => {
            v.value.forEach((_v, _index) => {
              message += `${_v}<br>`;
            });
          });
          errorCallBack(message);
        }
      );
  }

  async read(successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void): Promise<List_Product[]> {
    const promiseData: Promise<List_Product[]> = this.httpClientService
      .get<List_Product[]>({
        controller: 'products',
      })
      .toPromise();

    promiseData.then(d=>successCallBack()).catch((errrorResponse:HttpErrorResponse)=>errorCallBack(errrorResponse.error));

    return await promiseData;
  }
}
