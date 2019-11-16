import { Injectable } from '@angular/core'
import { FetchService } from '../../services'

@Injectable({
  providedIn: 'root'
})

export class VocabularyService {

  constructor(private fetch: FetchService) { }
}
